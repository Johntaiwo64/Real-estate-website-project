# Salem Real Estate

A responsive real-estate discovery interface built with React and Vite. The project demonstrates reusable React components, controlled form inputs, client-side filtering, saved listings, modal detail views, a mortgage repayment estimator and WhatsApp enquiry flows.

## Features

- Responsive navigation with an accessible mobile menu.
- Controlled property search by buying/renting intent, location, property type and maximum asking price.
- Property cards with detail modal and WhatsApp enquiry link.
- Saved-property shortlist (React state; session-only, not persisted).
- Mortgage repayment estimator with principal, interest and term inputs.
- Property submission enquiry form that prepares a WhatsApp message.
- Empty states, labelled controls, accessible button states and responsive layouts.

## Tech stack

- React 19
- JavaScript (ES modules and JSX)
- Vite
- CSS

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Project structure

```text
src/
  components/
    FeatureBand.jsx
    Footer.jsx
    Header.jsx
    HeroSearch.jsx
    MortgageCalculator.jsx
    OfferSection.jsx
    PropertyDetailsModal.jsx
    PropertySubmissionModal.jsx
    ServiceGrid.jsx
  App.jsx
  data.js
  index.css
  main.jsx
```

## Demo and production notes

The listings in `src/data.js` are sample content for demonstrating the interface. Verify property details, prices, images, counts, company contact information and availability before publishing as a live catalogue.

Search, filtering, the calculator and saved list run in the browser. Saved properties are not persisted after refresh. The submission form opens a prefilled WhatsApp enquiry; it does not store or publish listings. The sample data currently contains purchase listings only, so selecting Rent displays an empty state.

A production property platform still needs a secure backend/database, authentication and roles, persistent favourites, verified listing management, image uploads, moderation and automated tests. These are not claimed as implemented here.

## Supabase backend setup (database foundation)

The repository includes an initial SQL migration at `supabase/migrations/202611160001_initial_schema.sql`. It creates:

- `profiles` linked to Supabase Auth users, with ordinary-user and admin roles.
- `properties` with owner, price, location, type, buy/rent purpose and moderation status.
- `favorites` scoped to the signed-in user.
- Row Level Security policies for public active listings, owner submissions and admin moderation.
- A public `property-images` Storage bucket with authenticated owner-folder upload restrictions.

### Configure your Supabase project

1. Create a Supabase project at [supabase.com](https://supabase.com/).
2. Open **SQL Editor** in the Supabase dashboard.
3. Paste and run the migration file from `supabase/migrations/202611160001_initial_schema.sql`.
4. In **Project Settings → API**, copy the Project URL and publishable/anon key.
5. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Never put a Supabase `service_role` or secret key in frontend code, a `VITE_*` variable, or GitHub.

### Admin account

New registrations receive the `user` role. To grant admin access, first register your own account, find its UUID in **Authentication → Users**, then run this statement in the SQL Editor after replacing the placeholder:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

Do not expose admin promotion as a public form. Only a trusted project owner should run this SQL.

### Current integration status

This migration is the database/security foundation only. The current React interface still uses sample listings and browser state; authentication, database-backed listings/favourites and image upload must be connected and tested after a real Supabase project is configured. The SQL policies are included to protect those future client operations; they do not by themselves make the frontend persistent.

## License

No license has been specified. Contact the project owner before reusing the code or assets.
