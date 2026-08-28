import type { IncidentDraft } from './types';
export const DRAFT_STORAGE_KEY = 'cfr-financial-fraud-draft-v1';

export const emptyDraft: IncidentDraft = {
  step: 0,
  immediateActions: {},
  narrative: '',
  interpretation: null,
  interpretationConfirmed: false,
  amount: '',
  date: '',
  time: '',
  paymentMethod: '',
  provider: '',
  transactionId: '',
  recipient: '',
  multipleTransactions: '',
  contactChannel: '',
  suspectPhone: '',
  suspectHandle: '',
  suspectWebsite: '',
  suspectDisplayName: '',
  evidence: [],
  fullName: '',
  mobile: '',
  language: 'English',
  state: '',
  city: '',
  email: '',
  preferredContact: 'Mobile call',
  safeTime: '',
  reviewed: false,
  prototypeConsent: false,
  savedAt: null,
};

export const scamCards = [
  ['Fake investment and trading schemes', 'Promises of guaranteed returns, urgent deposits or private trading groups are common warning signs.'],
  ['Digital-arrest impersonation scams', 'Police and regulators do not demand secret payments to avoid a supposed digital arrest.'],
  ['Fake job or task scams', 'Be cautious when a job requires deposits, paid tasks or transfers to unlock earnings.'],
] as const;
