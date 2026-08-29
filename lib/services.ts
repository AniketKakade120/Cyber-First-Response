import type { Escalation, IncidentInterpretation } from './types';

export function isIncidentInterpretation(value: unknown): value is IncidentInterpretation {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  const nullableString = (item: unknown) => item === null || typeof item === 'string';
  return nullableString(data.suggestedCategory)
    && ['urgent', 'standard', 'unknown'].includes(String(data.urgency))
    && (data.amount === null || typeof data.amount === 'number')
    && data.currency === 'INR'
    && nullableString(data.paymentMethod)
    && nullableString(data.occurredAt)
    && nullableString(data.platform)
    && Array.isArray(data.suspectIdentifiers)
    && data.suspectIdentifiers.every((item) => Boolean(item) && typeof item === 'object' && typeof (item as Record<string, unknown>).type === 'string' && typeof (item as Record<string, unknown>).value === 'string')
    && typeof data.summary === 'string'
    && Array.isArray(data.missingFields) && data.missingFields.every((item) => typeof item === 'string')
    && Array.isArray(data.confidenceNotes) && data.confidenceNotes.every((item) => typeof item === 'string');
}

export function interpretIncidentDeterministically(narrative: string): IncidentInterpretation & {
  extractedProvider?: string;
  extractedTxId?: string;
  extractedRecipient?: string;
  extractedDate?: string;
  extractedTime?: string;
  extractedClaimedOrg?: string;
} {
  // First priority: look for currency symbol (₹, RS, RS., INR) followed by numbers
  let amount: number | null = null;
  const currencyMatch = narrative.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i);
  if (currencyMatch) {
    const parsed = Number(currencyMatch[1].replaceAll(',', ''));
    if (!isNaN(parsed) && parsed > 0) {
      amount = parsed;
    }
  }

  // Second priority: look for keywords like transfer, lost, paid followed by numbers
  if (!amount) {
    const actionMatch = narrative.match(/(?:transfer|transferred|lost|paid|pay|amount|sum)\s+(?:of\s+)?(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
    if (actionMatch) {
      const parsed = Number(actionMatch[1].replaceAll(',', ''));
      if (!isNaN(parsed) && parsed > 0) {
        amount = parsed;
      }
    }
  }

  // Fallback: look for 3+ digit numbers excluding 4-digit years (2020-2035)
  if (!amount) {
    const matches = narrative.replaceAll(',', '').match(/\d{3,}/g);
    if (matches) {
      for (const m of matches) {
        const num = Number(m);
        if (num && !(num >= 2020 && num <= 2035)) {
          amount = num;
          break;
        }
      }
    }
  }

  const lower = narrative.toLowerCase();

  const paymentMethod = lower.includes('upi') ? 'UPI'
    : (lower.includes('card') || lower.includes('credit') || lower.includes('debit')) ? 'Card'
    : (lower.includes('bank transfer') || lower.includes('neft') || lower.includes('rtgs') || lower.includes('imps')) ? 'Bank transfer'
    : (lower.includes('paytm') || lower.includes('wallet') || lower.includes('phonepe') || lower.includes('gpay')) ? 'Wallet'
    : null;

  // Extract actual bank or payment app used (do NOT map scammer's claimed org like "Bank Fraud Dept" to actual provider)
  const actualBankMatch = narrative.match(/\b(sbi|hdfc|icici|axis|kotak|pnb|canara|bob|paytm|phonepe|gpay|google pay)\b/i);
  const extractedProvider = actualBankMatch ? actualBankMatch[0].toUpperCase() : undefined;

  // Claimed organization (e.g. "bank's fraud department")
  const claimedOrgMatch = narrative.match(/(bank(?:'s)?\s+fraud\s+department|police|customs|cbi|trai|support desk)/i);
  const extractedClaimedOrg = claimedOrgMatch ? 'Bank fraud department' : undefined;

  // Extract transaction reference/UTR ID (ensure "approximately" is never captured)
  let extractedTxId: string | undefined;
  const txMatch = narrative.match(/(?:transaction reference number|utr|ref|reference|txn)\s*(?:shown in my banking app)?\s*(?:is|number)?\s*[:#]?\s*([a-z0-9]{8,25})/i);
  if (txMatch) {
    const candidate = txMatch[1].trim();
    if (candidate.toLowerCase() !== 'approximately' && candidate.toLowerCase() !== 'number') {
      extractedTxId = candidate;
    }
  }

  const upiMatch = narrative.match(/([a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+)/i);
  const extractedRecipient = upiMatch ? upiMatch[1] : undefined;

  // Date parsing (e.g., 27 August 2026 -> 2026-08-27)
  let extractedDate: string | undefined;
  const dateMatch = narrative.match(/(\d{1,2})\s+(august|aug|january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|september|sep|october|oct|november|nov|december|dec)\s+(\d{4})/i);
  if (dateMatch) {
    const day = dateMatch[1].padStart(2, '0');
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const monthIndex = monthNames.findIndex(m => dateMatch[2].toLowerCase().startsWith(m)) + 1;
    const month = monthIndex.toString().padStart(2, '0');
    const year = dateMatch[3];
    extractedDate = `${year}-${month}-${day}`;
  }

  // Time parsing (e.g. 3:15 PM -> 15:15)
  let extractedTime: string | undefined;
  const timeMatch = narrative.match(/(\d{1,2}):(\d{2})\s*(pm|am)?/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];
    const period = timeMatch[3]?.toLowerCase();
    if (period === 'pm' && hours < 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
    extractedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  const platform = (lower.includes('phone call') || lower.includes('phone') || lower.includes('called')) ? 'Phone call'
    : lower.includes('whatsapp') ? 'WhatsApp'
    : lower.includes('telegram') ? 'Telegram'
    : lower.includes('email') ? 'Email'
    : lower.includes('sms') ? 'SMS'
    : null;

  const missingFields = [!amount && 'amount', !paymentMethod && 'payment method', !platform && 'contact platform', !extractedTxId && 'transaction reference'].filter(Boolean) as string[];

  return {
    suggestedCategory: lower.includes('investment') ? 'Investment or trading fraud' : 'Financial cyber fraud',
    urgency: amount ? 'urgent' : 'unknown',
    amount,
    currency: 'INR',
    paymentMethod,
    occurredAt: null,
    platform,
    suspectIdentifiers: [],
    summary: narrative.trim() || 'No incident description supplied.',
    missingFields,
    confidenceNotes: ['This is an assistive suggestion, not a legal determination.', 'Review and correct every field before continuing.'],
    extractedProvider,
    extractedTxId,
    extractedRecipient,
    extractedDate,
    extractedTime,
    extractedClaimedOrg,
  };
}

export async function interpretIncident(narrative: string): Promise<{ mode: 'AI-assisted' | 'Guided assistance'; data: IncidentInterpretation }> {
  try {
    const response = await fetch('/api/interpret', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ narrative }) });
    if (!response.ok) throw new Error('Interpretation unavailable');
    return await response.json() as { mode: 'AI-assisted' | 'Guided assistance'; data: IncidentInterpretation };
  } catch {
    return { mode: 'Guided assistance', data: interpretIncidentDeterministically(narrative) };
  }
}

export function checkIdentifier(type: string, value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return { state: 'unable' as const, message: 'Enter an identifier to check.' };
  if (['fraud@upi', '+919999000000', 'fake-invest.example'].some((item) => normalized.includes(item))) {
    return { state: 'reported' as const, message: 'Reports associated with this identifier were found.' };
  }
  if (type === 'bank' && normalized.replace(/\D/g, '').length < 6) return { state: 'unable' as const, message: 'Enter enough information to check this identifier.' };
  return { state: 'no-match' as const, message: 'No matching reports were found.' };
}

export function createEscalation(reason: string, explanation: string): Escalation {
  return { acknowledgement: 'ESC-CFR-2026-001', reason, explanation, status: 'Received' };
}
