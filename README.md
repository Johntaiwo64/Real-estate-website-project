# Salem Real Estate

A responsive property-discovery application built with React 19, JavaScript, Vite and Supabase. It demonstrates reusable components, controlled search and filters, saved listings, property details, a mortgage estimator, WhatsApp enquiries, authentication and moderation-aware property submissions.

## Features

- Responsive navigation and mobile menu.
- Property filtering by buy/rent purpose, location, property type and maximum price.
- Property detail modal, WhatsApp enquiry links and saved-property shortlist.
- Demo favourites persist in the browser; authenticated favourites are stored in Supabase.
- Mortgage repayment estimator.
- Supabase email/password sign-up and sign-in.
- Public display of active database listings, with sample listings as a fallback.
- Signed-in users can submit properties for admin review; submissions start with `pending` status.
- Row Level Security policies for profiles, properties, favourites and property-image storage.
- GitHub Actions production-build workflow.

## Tech stack

- React 19, JavaScript (ES modules / JSX), Vite and CSS
- Supabase Auth, PostgreSQL and Storage

## Run locally

Requires Node.js 22.12+ (or a compatible newer release).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Create a production build with `npm run build`; run ESLint with `npm run lint`.

## Environment variables

Set these in `.env.local` and in your hosting provider's environment settings:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

The publishable/anon key is intended for browser apps when Row Level Security is correctly configured. Never expose a Supabase `service_role` or secret key in frontend code, a `VITE_*` variable, or GitHub.

## Supabase setup

1. Open the Supabase project dashboard and go to **SQL Editor**.
2. Run `supabase/migrations/202611160001_initial_schema.sql`.
3. Confirm that the `profiles`, `properties` and `favorites` tables exist and that Row Level Security is enabled.
4. Configure both environment variables locally and in the Vercel project.
5. Redeploy after changing Vercel environment variables.

The migration creates user profiles, property listings, favourites, account and timestamp triggers, RLS policies, and a public `property-images` Storage bucket with file-type, size and owner-folder restrictions.

### Admin account

New accounts receive the `user` role. To promote a trusted administrator, register the account, find its UUID in **Authentication → Users**, then run this in the SQL Editor after replacing the placeholder:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

Only a trusted project owner should promote administrators. Do not expose role promotion in the public application.

## Current limitations and production checklist

- The migration must still be applied to the intended Supabase project; repository code does not create the remote database.
- The Vercel deployment needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` configured for the required environments, followed by a redeploy.
- Property image upload UI and an admin dashboard are not implemented yet. Moderation currently requires a trusted administrator to update listing status through a secure database interface.
- Sample listings and category counts are demonstration content, not verified inventory. Verify all prices, property details, images and contact information before commercial use.
- End-to-end tests and a full production security review remain future work.

## License

No license has been specified. Contact the project owner before reusing code or assets.
