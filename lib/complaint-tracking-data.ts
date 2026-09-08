export type EventStatus = 'completed' | 'in_progress' | 'waiting' | 'action_required' | 'failed' | 'closed';

export type ComplaintEvent = {
  id: string;
  complaintId: string;
  eventType: string;
  status: EventStatus;
  title: string;
  citizenExplanation: string;
  responsibleEntity?: string;
  occurredAt?: string;
  confirmedAt?: string;
  sourceSystem: string;
  sourceReference?: string;
  citizenActionRequired: boolean;
  actionType?: string;
  whatThisMeans: string;
  metadata?: Record<string, unknown>;
};

export type EvidenceFile = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'Received' | 'Security scan in progress' | 'Accepted' | 'Could not be processed' | 'Additional file requested';
  referenceId: string;
  description?: string;
};

export type InstitutionStatus = 
  | 'Alert sent'
  | 'Institution acknowledged'
  | 'Review in progress'
  | 'Hold confirmed'
  | 'Partial funds secured'
  | 'Funds unavailable'
  | 'Recovery process initiated'
  | 'Outcome unavailable';

export type FinancialResponseData = {
  amountReported: number;
  currency: 'INR';
  paymentMethod: string;
  transactionDate: string;
  transactionTime: string;
  utrReference: string;
  recipientMasked: string;
  bankOrProvider: string;
  alertDispatchedAt: string;
  currentInstitutionResponse: InstitutionStatus;
  amountHeld: number | null; // null or number if officially confirmed
  amountRecovered: number | null; // null or number if officially confirmed
  disclaimer: string;
};

export type ComplaintAmendment = {
  id: string;
  field: string;
  originalValue: string;
  correctedValue: string;
  reason: string;
  submittedAt: string;
  status: 'Submitted — Under Review by Nodal Desk' | 'Approved & Updated' | 'Rejected';
};

export type TrackingRecord = {
  acknowledgementNumber: string;
  registeredDate: string;
  registeredTime: string;
  currentStatus: string;
  assignedState: string;
  jurisdictionUnit: string;
  investigatingOfficerNotice?: string;
  lastUpdatedAt: string;
  citizenName: string;
  citizenMobileMasked: string;
  citizenEmailMasked: string;
  preferredLanguage: string;
  smsUpdatesActive: boolean;
  emailUpdatesActive: boolean;
  financialResponse: FinancialResponseData;
  events: ComplaintEvent[];
  evidenceFiles: EvidenceFile[];
  amendments: ComplaintAmendment[];
  narrativeSummary: string;
  suspectDetails: {
    contactChannel: string;
    suspectPhone: string;
    suspectHandle: string;
    suspectClaimedOrg: string;
  };
};

export const defaultTrackingRecord: TrackingRecord = {
  acknowledgementNumber: 'NCRP-2026-0827-48391',
  registeredDate: '27 August 2026',
  registeredTime: '4:05 PM',
  currentStatus: 'Awaiting financial institution response',
  assignedState: 'Maharashtra',
  jurisdictionUnit: 'Cyber Police Station, Pune Rural',
  investigatingOfficerNotice: 'Preliminary documentation received. Case assigned to Sub-Inspector R. K. Patil.',
  lastUpdatedAt: '27 August 2026 at 4:12 PM',
  citizenName: 'Meera',
  citizenMobileMasked: '+91 98******10',
  citizenEmailMasked: 'me******@gmail.com',
  preferredLanguage: 'English',
  smsUpdatesActive: true,
  emailUpdatesActive: true,
  financialResponse: {
    amountReported: 48500,
    currency: 'INR',
    paymentMethod: 'UPI',
    transactionDate: '27 August 2026',
    transactionTime: '3:15 PM',
    utrReference: 'TEST20260827001',
    recipientMasked: 'te******nt@upi',
    bankOrProvider: 'SBI / PhonePe',
    alertDispatchedAt: '27 August 2026 at 4:08 PM',
    currentInstitutionResponse: 'Review in progress',
    amountHeld: 0,
    amountRecovered: 0,
    disclaimer: 'A request to review or hold an account does not guarantee that funds will be recovered. The outcome depends on how quickly the fraud was reported, whether funds remain available, and the response of participating institutions.',
  },
  events: [
    {
      id: 'EVT-01',
      complaintId: 'NCRP-2026-0827-48391',
      eventType: 'COMPLAINT_RECEIVED',
      status: 'completed',
      title: 'Complaint received',
      citizenExplanation: 'Your complaint and submitted narrative have been securely recorded in the national cybercrime reporting gateway.',
      responsibleEntity: 'NCRP Core Intake Gateway',
      occurredAt: '27 August 2026 at 4:05 PM',
      confirmedAt: '27 August 2026 at 4:05 PM',
      sourceSystem: 'NCRP-Central-Intake',
      sourceReference: 'ACK-MH-48391',
      citizenActionRequired: false,
      whatThisMeans: 'Your complaint is officially on record and cannot be deleted or modified without an audit trail. You can quote this number whenever communicating with law enforcement or banking authorities.',
    },
    {
      id: 'EVT-02',
      complaintId: 'NCRP-2026-0827-48391',
      eventType: 'FINANCIAL_ALERT_DISPATCHED',
      status: 'completed',
      title: 'Financial-fraud alert shared',
      citizenExplanation: 'Reported transaction details (₹48,500 via UPI) were shared with the connected Citizen Financial Cyber Fraud Reporting & Management System (CFCFRMS / Helpline 1930 network).',
      responsibleEntity: 'I4C CFCFRMS Nodal Desk',
      occurredAt: '27 August 2026 at 4:08 PM',
      confirmedAt: '27 August 2026 at 4:08 PM',
      sourceSystem: 'CFCFRMS API v2',
      sourceReference: 'DISP-MH-94120',
      citizenActionRequired: false,
      whatThisMeans: 'The system has alerted participating payment intermediaries and banks to trace the transaction path. You do not need to submit this transaction again.',
    },
    {
      id: 'EVT-03',
      complaintId: 'NCRP-2026-0827-48391',
      eventType: 'BANK_REVIEW_REQUEST',
      status: 'in_progress',
      title: 'Bank review request',
      citizenExplanation: 'A formal inquiry was sent to the beneficiary bank and payment aggregator to review the recipient account and place a lien on available funds.',
      responsibleEntity: 'State Bank of India (Beneficiary Nodal Cell)',
      occurredAt: '27 August 2026 at 4:12 PM',
      sourceSystem: 'NPCI-CFR-Direct',
      sourceReference: 'REQ-SBI-98421',
      citizenActionRequired: true,
      actionType: 'ADD_BANK_SRN',
      whatThisMeans: 'A request was sent to the relevant financial institution to review the beneficiary account. This does not mean that the account has been frozen or that money has been recovered. Confirmation depends on whether funds remain in the beneficiary account.',
    },
    {
      id: 'EVT-04',
      complaintId: 'NCRP-2026-0827-48391',
      eventType: 'INVESTIGATION_ASSIGNMENT',
      status: 'waiting',
      title: 'Assigned for investigation',
      citizenExplanation: 'Your complaint has been queued for assignment to the jurisdictional Cyber Police Station based on your reported incident location.',
      responsibleEntity: 'Cyber Police Station, Pune Rural (Maharashtra Police)',
      sourceSystem: 'CCTNS National Police Gateway',
      sourceReference: 'PENDING_CCTNS_FIR',
      citizenActionRequired: false,
      whatThisMeans: 'Police assignment ensures an investigating officer reviews your submitted evidence. Law enforcement may request clarification or original device logs if required.',
    },
    {
      id: 'EVT-05',
      complaintId: 'NCRP-2026-0827-48391',
      eventType: 'INVESTIGATION_UPDATE',
      status: 'waiting',
      title: 'Investigation update',
      citizenExplanation: 'Case will proceed under preliminary review once the bank provides initial transaction trail logs.',
      responsibleEntity: 'Maharashtra Cyber Digital Crime Unit',
      sourceSystem: 'CCTNS Case File',
      citizenActionRequired: false,
      whatThisMeans: 'You will receive an automated SMS and email notification whenever an investigating officer logs an official case update or closure outcome.',
    },
  ],
  evidenceFiles: [
    {
      id: 'EV-01',
      name: 'UPI payment receipt.jpg',
      type: 'Image (JPEG)',
      size: '1.2 MB',
      uploadedAt: '27 August 2026, 4:02 PM',
      status: 'Accepted',
      referenceId: 'EV-94812',
      description: 'Screenshot of UPI success screen showing UTR TEST20260827001',
    },
    {
      id: 'EV-02',
      name: 'WhatsApp screenshots.pdf',
      type: 'Document (PDF)',
      size: '3.4 MB',
      uploadedAt: '27 August 2026, 4:03 PM',
      status: 'Accepted',
      referenceId: 'EV-94813',
      description: 'Chat log with caller claiming to be bank fraud department',
    },
    {
      id: 'EV-03',
      name: 'Bank statement.pdf',
      type: 'Document (PDF)',
      size: '2.1 MB',
      uploadedAt: '27 August 2026, 4:04 PM',
      status: 'Security scan in progress',
      referenceId: 'EV-94814',
      description: 'Bank passbook extract showing debit of ₹48,500',
    },
    {
      id: 'EV-04',
      name: 'Call recording.mp3',
      type: 'Audio (MP3)',
      size: '4.8 MB',
      uploadedAt: '27 August 2026, 4:05 PM',
      status: 'Could not be processed',
      referenceId: 'EV-94815',
      description: 'Audio recording of caller demanding immediate verification payment',
    },
  ],
  amendments: [],
  narrativeSummary: 'On 27 August 2026 at approximately 3:15 PM, I received an urgent phone call from a person claiming to be from my bank’s fraud department. The caller stated that my debit card and account would be blocked immediately due to suspicious overseas activity unless I completed a verification security transaction. Under duress, I was instructed to transfer ₹48,500 via UPI to testmerchant@upi. The transaction reference number shown in my banking app is TEST20260827001. Immediately after payment was confirmed, the caller disconnected the call and blocked my number.',
  suspectDetails: {
    contactChannel: 'Phone call (+91 98765 43210)',
    suspectPhone: '+91 98765 43210',
    suspectHandle: 'testmerchant@upi',
    suspectClaimedOrg: 'Bank Fraud Prevention Desk (Impersonation)',
  },
};
