export type EvidenceState = 'ready' | 'uploading' | 'uploaded' | 'attached' | 'failed' | 'retry';

export type EvidenceAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  description?: string;
  state: EvidenceState;
};

export type SourceState = 'description' | 'user' | 'confirm' | 'missing';

export type TransactionItem = {
  id: string;
  amount: string;
  currency: string;
  date: string;
  time: string;
  paymentMethod: string;
  provider: string;
  transactionId: string;
  recipient: string;
  status: 'completed' | 'attempted' | 'reversed' | 'unknown';
};

export type TimelineItem = {
  id: string;
  eventType: string;
  date: string;
  time: string;
  description: string;
};

export type ContactIdentifier = {
  id: string;
  channel: string;
  value: string;
  nameUsed?: string;
  orgClaimed?: string;
};

export type ReporterRelation = 'self' | 'child' | 'family' | 'assisted' | 'org';

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
  immediateActions: Record<string, 'done' | 'help' | 'later'>;
  narrative: string;
  interpretation: IncidentInterpretation | null;
  interpretationConfirmed: boolean;
  sourceMap: Record<string, SourceState>;
  
  // Section A: Timeline
  timeline: TimelineItem[];
  
  // Section B: Transactions
  transactions: TransactionItem[];
  amount: string;
  date: string;
  time: string;
  paymentMethod: string;
  provider: string;
  transactionId: string;
  recipient: string;
  multipleTransactions: string;
  
  // Section C: Contact & Suspect details
  contactChannel: string;
  contactChannels: string[];
  suspectPhone: string;
  suspectHandle: string;
  suspectWebsite: string;
  suspectDisplayName: string;
  suspectOrgClaimed: string;
  contactIdentifiers: ContactIdentifier[];
  
  // Section 3: Evidence
  evidence: EvidenceAttachment[];
  
  // Section 4: Reporter & About You
  reporterRelation: ReporterRelation;
  fullName: string;
  mobile: string;
  victimName: string;
  victimMobile: string;
  primaryContactRole: 'reporter' | 'victim';
  orgName: string;
  orgType: string;
  orgRegId: string;
  reporterDesignation: string;
  language: string;
  state: string;
  city: string;
  email: string;
  incidentLocationDiffers: boolean;
  incidentState: string;
  incidentCity: string;
  isSafeToCall: boolean;
  safeContactMethod: string;
  safeTimeWindow: string;
  alternativeContact: string;
  
  // Section 5: Review & Save
  reviewed: boolean;
  prototypeConsent: boolean;
  savedAt: string | null;
};

export type Escalation = {
  acknowledgement: string;
  reason: string;
  explanation: string;
  status: 'Received';
};
