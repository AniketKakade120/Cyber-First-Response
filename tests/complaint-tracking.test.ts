import { describe, expect, it } from 'vitest';
import { defaultTrackingRecord, type ComplaintEvent, type EvidenceFile } from '../lib/complaint-tracking-data';

describe('Official Complaint Tracking Data Model', () => {
  it('contains the realistic sample complaint data requested by specification', () => {
    expect(defaultTrackingRecord.acknowledgementNumber).toBe('NCRP-2026-0827-48391');
    expect(defaultTrackingRecord.citizenName).toBe('Meera');
    expect(defaultTrackingRecord.financialResponse.amountReported).toBe(48500);
    expect(defaultTrackingRecord.financialResponse.paymentMethod).toBe('UPI');
    expect(defaultTrackingRecord.assignedState).toBe('Maharashtra');
    expect(defaultTrackingRecord.currentStatus).toBe('Awaiting financial institution response');
  });

  it('provides verified event structures with plain-language explanations and source systems', () => {
    const events = defaultTrackingRecord.events;
    expect(events.length).toBeGreaterThanOrEqual(5);

    events.forEach((evt: ComplaintEvent) => {
      expect(evt.id).toBeDefined();
      expect(evt.title).toBeDefined();
      expect(evt.citizenExplanation).toBeDefined();
      expect(evt.sourceSystem).toBeDefined();
      expect(evt.whatThisMeans).toBeDefined();
      expect(['completed', 'in_progress', 'waiting', 'action_required', 'failed', 'closed']).toContain(evt.status);
    });

    const receivedEvt = events.find((e) => e.eventType === 'COMPLAINT_RECEIVED');
    expect(receivedEvt?.status).toBe('completed');

    const alertEvt = events.find((e) => e.eventType === 'FINANCIAL_ALERT_DISPATCHED');
    expect(alertEvt?.status).toBe('completed');
    expect(alertEvt?.sourceReference).toBe('DISP-MH-94120');

    const bankEvt = events.find((e) => e.eventType === 'BANK_REVIEW_REQUEST');
    expect(bankEvt?.status).toBe('in_progress');
    expect(bankEvt?.whatThisMeans).toContain('does not mean that the account has been frozen');
  });

  it('guarantees transparent financial disclosure without premature freeze claims', () => {
    const fin = defaultTrackingRecord.financialResponse;
    expect(fin.amountHeld).toBe(0);
    expect(fin.amountRecovered).toBe(0);
    expect(fin.disclaimer).toContain('A request to review or hold an account does not guarantee that funds will be recovered');
    expect(fin.recipientMasked).toMatch(/^te.*@upi$/);
    expect(fin.utrReference).toBe('TEST20260827001');
  });

  it('tracks evidence files with security scanning states', () => {
    const files = defaultTrackingRecord.evidenceFiles;
    expect(files.length).toBe(4);

    const accepted = files.filter((f: EvidenceFile) => f.status === 'Accepted');
    expect(accepted.length).toBe(2);

    const scanning = files.find((f: EvidenceFile) => f.status === 'Security scan in progress');
    expect(scanning).toBeDefined();

    const failed = files.find((f: EvidenceFile) => f.status === 'Could not be processed');
    expect(failed).toBeDefined();
  });
});
