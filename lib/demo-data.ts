import type { Complaint, IncidentDraft } from './types';

export const DEMO_ACKNOWLEDGEMENT = 'CFR-2026-001';
export const DEMO_OTP = '123456';
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

export const demoComplaint: Complaint = {
  acknowledgement: 'CFR-2026-001',
  summary: 'Fake WhatsApp investment offer followed by a ₹25,000 UPI transfer.',
  amount: 25000,
  submittedAt: '27 August 2026, 5:45 PM IST',
  lastUpdated: '28 August 2026, 10:30 AM IST',
  status: 'Your complaint has been received and routed for initial review.',
  moneyStatus: {
    reported: 25000,
    holdRequest: 'Sent to the receiving financial institution',
    confirmedOnHold: 18000,
    refundAuthorised: false,
    citizenAction: 'Respond to the evidence request. Do not treat a hold as a refund.',
  },
  timeline: [
    { title: 'Complaint submitted', at: '27 Aug, 5:45 PM', organisation: 'Cyber First Response', meaning: 'Your complaint record was created.', action: 'Keep the acknowledgement number.', state: 'complete' },
    { title: 'Financial institution notified', at: '27 Aug, 5:47 PM', organisation: 'Payment network', meaning: 'A hold request was sent to the receiving institution.', action: 'Monitor messages from your bank and this dashboard.', state: 'complete' },
    { title: 'State cybercrime unit assigned', at: '27 Aug, 6:15 PM', organisation: 'State cybercrime unit', meaning: 'The complaint was routed for initial review.', action: 'Verify any caller using the contact details in this portal.', state: 'complete' },
    { title: 'Initial information review', at: '28 Aug, 10:30 AM', organisation: 'Review officer', meaning: 'The information you provided is being checked.', action: 'Add a clearer transaction receipt.', state: 'current' },
    { title: 'Additional evidence review', at: 'Pending', organisation: 'Review officer', meaning: 'Review begins after the requested evidence is attached.', action: 'Upload the requested document when it is ready.', state: 'pending' },
  ],
};

export const scamCards = [
  ['Fake investment and trading schemes', 'Promises of guaranteed returns, urgent deposits or private trading groups are common warning signs.'],
  ['Digital-arrest impersonation scams', 'Police and regulators do not demand secret payments to avoid a supposed digital arrest.'],
  ['Fake job or task scams', 'Be cautious when a job requires deposits, paid tasks or transfers to unlock earnings.'],
] as const;
