import { demoComplaint, DEMO_ACKNOWLEDGEMENT } from './demo-data';
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

export function interpretIncidentDeterministically(narrative: string): IncidentInterpretation {
  const amountMatch = narrative.replaceAll(',', '').match(/(?:₹|rs\.?|inr)?\s*(\d{3,})/i);
  const lower = narrative.toLowerCase();
  const paymentMethod = lower.includes('upi') ? 'UPI' : lower.includes('card') ? 'Card' : lower.includes('bank') ? 'Bank transfer' : null;
  const platform = lower.includes('whatsapp') ? 'WhatsApp' : lower.includes('telegram') ? 'Telegram' : null;
  const amount = amountMatch ? Number(amountMatch[1]) : null;
  const missingFields = [!amount && 'amount', !paymentMethod && 'payment method', !platform && 'contact platform', 'transaction reference'].filter(Boolean) as string[];
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

export function lookupComplaint(value: string) {
  return value.trim().toUpperCase() === DEMO_ACKNOWLEDGEMENT ? demoComplaint : null;
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
