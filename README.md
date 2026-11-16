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

## License

No license has been specified. Contact the project owner before reusing the code or assets.
