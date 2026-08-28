import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  checkIdentifier,
  createEscalation,
  interpretIncident,
  interpretIncidentDeterministically,
  isIncidentInterpretation,
} from '../lib/services';

afterEach(() => vi.unstubAllGlobals());

describe('deterministic incident interpretation', () => {
  it('extracts an amount, payment method, platform and category', () => {
    const result = interpretIncidentDeterministically('I paid ₹25,000 by UPI after an investment message on WhatsApp.');
    expect(result).toMatchObject({
      amount: 25000,
      currency: 'INR',
      paymentMethod: 'UPI',
      platform: 'WhatsApp',
      suggestedCategory: 'Investment or trading fraud',
      urgency: 'urgent',
    });
  });

  it('reports missing fields without inventing them', () => {
    const result = interpretIncidentDeterministically('Someone asked me to pay, but I did not keep the details.');
    expect(result.amount).toBeNull();
    expect(result.missingFields).toEqual(expect.arrayContaining(['amount', 'payment method', 'contact platform', 'transaction reference']));
  });

  it('falls back deterministically when the API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const result = await interpretIncident('I sent 5000 using a card.');
    expect(result.mode).toBe('Guided assistance');
    expect(result.data.amount).toBe(5000);
    expect(result.data.paymentMethod).toBe('Card');
  });

  it('rejects incomplete AI-shaped data', () => {
    expect(isIncidentInterpretation({ summary: 'Missing required fields' })).toBe(false);
    expect(isIncidentInterpretation(interpretIncidentDeterministically('I sent 5000 by UPI.'))).toBe(true);
  });
});

describe('guided service utilities', () => {
  it('returns every checker state', () => {
    expect(checkIdentifier('upi', 'fraud@upi').state).toBe('reported');
    expect(checkIdentifier('phone', '+91 81111 22222').state).toBe('no-match');
    expect(checkIdentifier('bank', '123').state).toBe('unable');
  });

  it('creates a clearly simulated escalation receipt', () => {
    expect(createEscalation('No update received', 'Please explain the delay.')).toEqual({
      acknowledgement: 'ESC-CFR-2026-001',
      reason: 'No update received',
      explanation: 'Please explain the delay.',
      status: 'Received',
    });
  });
});
