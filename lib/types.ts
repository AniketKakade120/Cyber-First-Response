export type EvidenceState = 'ready' | 'uploading' | 'uploaded' | 'attached' | 'failed' | 'retry';

export type EvidenceAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  description?: string;
  state: EvidenceState;
};

export type IncidentInterpretation = {
  suggestedCategory: string | null;
  urgency: 'urgent' | 'standard' | 'unknown';
  amount: number | null;
  currency: 'INR';
  paymentMethod: string | null;
  occurredAt: string | null;
  platform: string | null;
  suspectIdentifiers: Array<{ type: string; value: string }>;
  summary: string;
  missingFields: string[];
  confidenceNotes: string[];
};

export type IncidentDraft = {
  step: number;
  immediateActions: Record<string, string>;
  narrative: string;
  interpretation: IncidentInterpretation | null;
  interpretationConfirmed: boolean;
  amount: string;
  date: string;
  time: string;
  paymentMethod: string;
  provider: string;
  transactionId: string;
  recipient: string;
  multipleTransactions: string;
  contactChannel: string;
  suspectPhone: string;
  suspectHandle: string;
  suspectWebsite: string;
  suspectDisplayName: string;
  evidence: EvidenceAttachment[];
  fullName: string;
  mobile: string;
  language: string;
  state: string;
  city: string;
  email: string;
  preferredContact: string;
  safeTime: string;
  reviewed: boolean;
  prototypeConsent: boolean;
  savedAt: string | null;
};

export type TimelineEvent = {
  title: string;
  at: string;
  organisation: string;
  meaning: string;
  action: string;
  state: 'complete' | 'current' | 'pending';
};

export type Complaint = {
  acknowledgement: 'CFR-2026-001';
  summary: string;
  amount: number;
  submittedAt: string;
  lastUpdated: string;
  status: string;
  moneyStatus: {
    reported: number;
    holdRequest: string;
    confirmedOnHold: number;
    refundAuthorised: false;
    citizenAction: string;
  };
  timeline: TimelineEvent[];
};

export type Escalation = {
  acknowledgement: string;
  reason: string;
  explanation: string;
  status: 'Received';
};
