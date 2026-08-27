import { interpretIncidentDeterministically, isIncidentInterpretation } from '../../../lib/services';

export async function POST(request: Request) {
  let narrative = '';
  try {
    const body = await request.json() as { narrative?: unknown };
    narrative = typeof body.narrative === 'string' ? body.narrative.trim().slice(0, 5000) : '';
  } catch { return Response.json({ error: 'Invalid request' }, { status: 400 }); }
  if (!narrative) return Response.json({ error: 'Narrative is required' }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ mode: 'Guided assistance', data: interpretIncidentDeterministically(narrative) });

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        input: [{ role: 'system', content: [{ type: 'input_text', text: 'Structure this synthetic Indian financial cyber-fraud narrative. Do not make legal determinations, identify a real person, invent evidence, or fill unknown values. Return only JSON matching the supplied shape.' }] }, { role: 'user', content: [{ type: 'input_text', text: narrative }] }],
        text: { format: { type: 'json_schema', name: 'incident_interpretation', strict: true, schema: { type: 'object', additionalProperties: false, required: ['suggestedCategory', 'urgency', 'amount', 'currency', 'paymentMethod', 'occurredAt', 'platform', 'suspectIdentifiers', 'summary', 'missingFields', 'confidenceNotes'], properties: { suggestedCategory: { type: ['string', 'null'] }, urgency: { enum: ['urgent', 'standard', 'unknown'] }, amount: { type: ['number', 'null'] }, currency: { const: 'INR' }, paymentMethod: { type: ['string', 'null'] }, occurredAt: { type: ['string', 'null'] }, platform: { type: ['string', 'null'] }, suspectIdentifiers: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['type', 'value'], properties: { type: { type: 'string' }, value: { type: 'string' } } } }, summary: { type: 'string' }, missingFields: { type: 'array', items: { type: 'string' } }, confidenceNotes: { type: 'array', items: { type: 'string' } } } } } },
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error('OpenAI request failed');
    const payload = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
    const outputText = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;
    if (!outputText) throw new Error('No structured output');
    const data: unknown = JSON.parse(outputText);
    if (!isIncidentInterpretation(data)) throw new Error('Invalid structured output');
    return Response.json({ mode: 'AI-assisted', data });
  } catch {
    return Response.json({ mode: 'Guided assistance', data: interpretIncidentDeterministically(narrative) });
  }
}
