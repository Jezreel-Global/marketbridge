# MarketBridge

Cross-border marketplace payout management demo for the **GDG Ilorin × Blaaiz Buildathon**.

The landing page introduces the payout journey and includes an editable illustrative estimate. Open `/payouts` to choose a seller, review the fee and estimated recipient amount, create a mock payout, and inspect its details and status timeline. **This app does not connect to Blaaiz, execute payouts, quote live FX, or move money.** No verified Blaaiz sandbox credentials were available during implementation.

## Demo behavior

- Payouts are explicitly marked as simulated and are saved in the current browser's `localStorage`. They are local to that browser and are not shared between users or devices.
- FX rates and the 1.5% fee are fixed illustrative sample values, not live rates or Blaaiz pricing.
- A created payout can be advanced from **Queued → Processing → Completed** to demonstrate transaction tracking. Every transition is labelled as a mock state.
- No credentials are required for the payout demo. Do not enter real personal or financial information.

## Existing application functionality

The original marketplace remains available at `/marketplace`, with listing and booking routes intact. `/admin`, `/provider`, `/seller`, `/sign-in`, and `/sign-up` also remain available. The former `/playground` URL redirects to the payout workspace. Existing seller authentication uses Clerk; runtime marketplace bookings and simulated payment attempts use Neon PostgreSQL. These features are separate from the browser-local payout demonstration.

The project continues to use Next.js App Router, React, TypeScript, Tailwind CSS, Clerk (optional seller authentication), and Neon PostgreSQL. It has not migrated to Firebase.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page and [http://localhost:3000/payouts](http://localhost:3000/payouts) for the payout dashboard. Both work without environment variables. Configure `.env.local` only when exercising the existing authenticated seller or Neon-backed marketplace workflows.

### Existing marketplace environment variables

See `.env.example` for the full list. Key values include:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Server-side Neon PostgreSQL connection for marketplace booking and seller profile persistence |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional public Clerk publishable key for seller authentication |
| `CLERK_SECRET_KEY` | Optional server-only Clerk secret |
| `ADMIN_CLERK_USER_IDS` | Server-only allowlist for `/admin` |
| `DEMO_ACCESS_TOKEN` | Optional shared gate for protected demo pages |

Never expose server secrets through `NEXT_PUBLIC_*` variables or commit credentials. Blaaiz documents OAuth 2.0 client credentials for new API integrations; this version does not read OAuth credentials, request tokens, or make Blaaiz API calls. No Blaaiz credentials are configured in the repository. See [Blaaiz authentication](https://docs.blaaiz.com/docs/guides/authentication) and [payout requirements](https://docs.blaaiz.com/docs/payments/payout/create-a-payout) before implementing the provider flow.

## Database

The existing Neon schema is managed by SQL migrations in `db/migrations/`. The migration runner applies all unapplied migrations in filename order. Inspect the full pending migration list and verify the target Neon branch, database, and backup before running `npm run db:migrate`. No migration is needed for the browser-local payout demo, and no database migration was run for this rebrand.

Do not run `npm run db:reset-demo` against a production database. The script requires explicit non-production confirmations and the exact database name.

## Checks

```bash
npm test
npm run lint
npm run build
```

The database integration suite is separate and should only run against a disposable, explicitly confirmed non-production database:

```bash
npm run test:db
```

## Vercel deployment

Import the existing GitHub repository as a Next.js project and use the default build command (`npm run build`). The payout demonstration can be deployed without Blaaiz or database credentials, but its transaction history remains browser-local. Configure the existing Clerk and Neon server-side variables only if enabling those legacy marketplace features. Use Vercel Deployment Protection for private previews where appropriate.

## Product status

This is a hackathon MVP and a clearly labelled simulation. A real payout integration requires verified Blaaiz sandbox access, server-side credentials, provider documentation, and a separately implemented and tested provider flow. Until then, MarketBridge must not represent a mock payout or estimate as a provider-confirmed transfer or live quote.
