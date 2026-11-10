# KOJA

**Move value across borders.** KOJA is an African-rooted cross-border marketplace payout workflow built for the GDG Ilorin × Blaaiz Buildathon. Operators can review an illustrative transfer estimate, create a clearly labelled mock payout, and follow its example status timeline.

> **Submission status:** Blaaiz development dashboard access is now available to the builder, but the application is not connected to Blaaiz yet. The current payout flow uses browser-local mock records, fixed illustrative FX and fees, and simulated status transitions. It does not request an OAuth token, call Blaaiz, quote live FX, or move money.

## Submission

- **Repository:** [Jezreel-Global/marketbridge](https://github.com/Jezreel-Global/marketbridge)
- **Live demo:** [https://marketbridge-ng.vercel.app](https://marketbridge-ng.vercel.app)
- **Landing screenshot:** [KOJA landing page](./artifacts/koja-landing-page.png)
- **Buildathon:** GDG Ilorin × Blaaiz Buildathon

### Project summary

KOJA is an African-rooted cross-border seller payout workflow built for marketplace teams. Operators can review an illustrative FX rate and fee, create a clearly labelled mock payout, and follow its status timeline. Blaaiz sandbox dashboard access is available to the builder, but API credentials and provider calls are not configured in this demo, so no funds move.

## Product journey

1. Open the payout dashboard and select a sample seller/recipient.
2. Enter a transfer amount and choose source and destination currencies.
3. Review the sample FX rate, 1.5% illustrative fee, and estimated recipient amount.
4. Review and confirm a mock payout.
5. Find the payout in the transaction tracker, inspect its details and timeline, and advance the example through mock statuses.

The rate and fee are fixed demo values. Each payout is saved to this browser's `localStorage` only; it is not shared between browsers or users. Payout state progression is a demonstration and is not a Blaaiz response or settlement event. Do not enter real bank or beneficiary details.

## Routes and pages

| Route | What it does | Data and limitations |
| --- | --- | --- |
| `/` | KOJA landing page with an editable estimate preview, product explanation, and payout journey. | Estimate is illustrative. It does not contact Blaaiz. |
| `/payouts` | Main product workspace: recipient selection, amount and currency entry, estimate review, mock confirmation, transaction tracker, details, and status timeline. | Payouts and mock statuses live in this browser only. |
| `/marketplace` | Original marketplace catalog and booking demo. Its marketplace content and booking flow are retained. | Seed listings and booking/payment states are examples; no payment provider is called. |
| `/listings/[id]` | Listing details and booking actions for the existing marketplace. | Booking information follows the existing demo persistence and privacy rules. |
| `/bookings/[id]` | Booking status/details page. | A displayed seed or simulated payment state is not provider-confirmed. |
| `/provider` | Provider-facing illustration of seeded marketplace activity. | Not an authenticated seller payout portal or payout ledger. |
| `/admin` | Restricted marketplace admin view for booking and payment-attempt records. | Requires configured admin authentication; totals are not balances or settlements. |
| `/seller` | Optional authenticated seller profile page. | Uses Clerk when configured; it is separate from the mock payout workspace. |
| `/sign-in`, `/sign-up` | Existing Clerk sign-in and registration routes. | Optional; not required to try the payout demo. |
| `/demo-access` | Entry point for an optional shared demo gate. | Only applies when `DEMO_ACCESS_TOKEN` is configured. |
| `/playground` | Compatibility redirect to `/payouts`. | The former marketplace demo studio is no longer in the primary navigation. |

## Blaaiz integration status

The current build is a labelled mock mode. There is no Blaaiz API key, OAuth client ID, or client secret in the repository, and no API call is made from the application. The builder has access to the Blaaiz development dashboard, but application credentials, API services, payout prerequisites, and an end-to-end provider flow still need to be configured and verified.

Blaaiz's current authentication documentation specifies OAuth 2.0 client credentials for new API integrations; legacy API-key creation is disabled. A payout flow also requires the appropriate OAuth scopes, verified customer setup, wallet and recipient details, fee checks, and webhook/status handling. Consult the official docs before enabling provider calls:

- [Blaaiz authentication](https://docs.blaaiz.com/docs/guides/authentication)
- [Creating a payout](https://docs.blaaiz.com/docs/payments/payout/create-a-payout)
- [Creating your first payout](https://docs.blaaiz.com/docs/guides/creating-first-payout)

Never paste credentials into the browser or commit them. When integration code is ready, keep client credentials server-side in Vercel Environment Variables. The commented `BLAAIZ_CLIENT_ID` and `BLAAIZ_CLIENT_SECRET` names in `.env.example` are placeholders only; this version does not read them.

## Technology and architecture

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Neon PostgreSQL for the existing marketplace runtime records
- Clerk for optional seller authentication
- Vercel for deployment

The product retains the existing marketplace and database stack. It has not migrated to Firebase. The new payout demo does not require Neon, Clerk, or Blaaiz credentials.

## Run locally

Requirements: Node.js 20 or later and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for KOJA or [http://localhost:3000/payouts](http://localhost:3000/payouts) for the payout workflow. Both run in mock mode without environment variables.

Copy `.env.example` to `.env.local` only when exercising the existing Clerk or Neon marketplace functionality. Configure server-only secrets locally; never use `NEXT_PUBLIC_` for secrets.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Server-side Neon connection for existing marketplace booking/profile persistence. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional Clerk browser key for seller authentication. |
| `CLERK_SECRET_KEY` | Optional server-only Clerk secret. |
| `ADMIN_CLERK_USER_IDS` | Server-only IDs permitted to view `/admin`. |
| `DEMO_ACCESS_TOKEN` | Optional shared gate for protected demo pages. |
| `BLAAIZ_CLIENT_ID`, `BLAAIZ_CLIENT_SECRET` | Reserved placeholders; no app code consumes these yet. Add only after the provider adapter is implemented. |

## Database

The existing Neon schema and SQL migrations are in `db/migrations/`. The browser-local payout demo does not use a database migration. Before running `npm run db:migrate`, review all pending migrations and confirm the target database and backup. Do not run `npm run db:reset-demo` against production.

## Verification

```bash
npm test
npm run lint
npm run build
```

The database integration suite is separate and must only use a disposable, explicitly confirmed non-production database:

```bash
npm run test:db
```

## Deployment

The current demo is hosted at [marketbridge-ng.vercel.app](https://marketbridge-ng.vercel.app). It is served from the `codex/marketbridge-security` preview deployment; the repository's `main` branch may have a different production deployment. The payout demo works without provider credentials and stores its transaction history in each visitor's browser.

To deploy the project in Vercel, connect the existing GitHub repository, retain the Next.js framework preset, and use `npm run build`. Add Neon and Clerk server-side environment variables only if enabling the related existing marketplace features. Blaaiz credentials are not needed for mock mode.

## Submission checklist

- [x] Repository URL included above.
- [x] Live demo URL included above.
- [x] Project summary is three sentences and clearly labels the mock integration.
- [x] Landing screenshot is included at [`artifacts/koja-landing-page.png`](./artifacts/koja-landing-page.png).
- [ ] Confirm the submission form's exact fields after signing in to the organizer's Google account.
- [ ] Upload the screenshot or a short screen recording to the form.

The organizer's email requests a repository or live demo, a 2–3 sentence summary, and one screenshot or short screen recording. The form link currently redirects to Google sign-in, so its field labels could not be verified anonymously.
