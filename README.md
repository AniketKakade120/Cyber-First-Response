# Cyber First Response

An independent, citizen-first concept prototype for urgent cyber-fraud guidance, simulated reporting, complaint tracking and recovery-status communication. It is not a Government of India service and does not submit information to NCRP, police, banks, platforms or payment providers.

## Run locally

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install --ignore-scripts
pnpm dev
```

Open `http://localhost:3000`.

## Verify

```bash
pnpm test
pnpm lint
pnpm build
```

## Demo data

- Complaint acknowledgement: `CFR-2026-001`
- Recovery OTP: `123456`
- Checker matches: `fraud@upi`, `+919999000000`, `fake-invest.example`
- Suggested narrative: `I paid ₹25,000 by UPI after an investment message on WhatsApp.`

Use synthetic information and files only. Draft text and attachment metadata are stored in the current browser; evidence file contents are not uploaded.

## Optional AI mode

Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY`. `OPENAI_MODEL` is optional. The key is read only by `/api/interpret`; if the API call, response validation or configuration fails, the route returns the deterministic interpretation. Every suggestion is labelled and editable before simulated submission.

## Design system

The app uses `ux4g-web-components@2.0.1` in the default UX4G light/dark themes. App CSS is limited to service-specific composition and uses UX4G semantic tokens. The control-border semantic token is mapped to UX4G's strong neutral border token to meet the supplied contrast guidance.

## Routes

- `/` — homepage and incident triage
- `/report` — reporting route chooser
- `/report/financial-fraud` — complete seven-step simulated report
- `/report/sensitive-harm`, `/report/identity`, `/report/anonymous` — honest informational routes
- `/track` and `/complaint/demo-cfr-2026-001` — synthetic tracking and dashboard
- `/check` — synthetic suspicious-identifier checker
- `/help`, `/learn`, `/about-prototype` — guidance and disclosures

Hosting configuration is in `.openai/hosting.json`. No database or object storage is required for this v1 prototype.
