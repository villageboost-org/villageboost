# Village Boost

Village Boost is a crowdfunding platform for East Africa, in the spirit of Kickstarter. Creators launch campaigns, backers contribute, and creators post progress updates.

## Tech stack

### Internal (in the codebase)

| Technology | Version | Used for |
| --- | --- | --- |
| [Next.js](https://nextjs.org) (App Router) | 16.2.9 | Framework: routing, server components, server actions |
| [React](https://react.dev) | 19.2.4 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Layout and custom styling, with brand colours defined in `app/globals.css` |
| [HeroUI](https://heroui.com) (`@heroui/react`, `@heroui/styles`) | 3.2 | Form components (TextField, Select, Checkbox, ...), built on React Aria. Theme overrides at the bottom of `app/globals.css` |
| [Lucide](https://lucide.dev) (`lucide-react`) | 1 | Icons |
| [Sonner](https://sonner.emilkowal.ski) | 2 | Toast notifications |
| [react-confetti](https://github.com/alampros/react-confetti) | 6 | Confetti on the sign-up success screen |
| [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) | 1.13 | Phone number validation and formatting (`/mobile` rules, Kenya by default) |
| [Supabase JS](https://supabase.com/docs/reference/javascript) and [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side) | 2.110 / 0.12 | Auth and database clients for browser, server and admin use |
| [ESLint](https://eslint.org) with `eslint-config-next` | 9 | Linting |

### External services

| Service | Used for |
| --- | --- |
| [Supabase](https://supabase.com) | PostgreSQL database, Auth (email and password), Row Level Security policies |
| [Resend](https://resend.com) | Custom SMTP provider for Supabase auth emails (sign-up confirmation, password reset) |
| [Google Fonts](https://fonts.google.com) | Epilogue (headings) and Manrope (body text), loaded through `next/font` |

## Project structure

```
app/
  (auth)/          Sign-up and login pages
    sign-up/       3-step wizard (StepOne, StepTwo, StepThree)
  (main)/          Public pages: home, campaigns, campaign detail
  actions/auth.ts  Server actions: signUp, signIn, signOut, password reset
  auth/callback/   Handles the link from confirmation and reset emails
  components/      Shared UI (Header, Footer, EyeIcon, ...)
  data/            Static data that will later come from Supabase
lib/supabase/
  client.ts        Browser client
  server.ts        Server client (uses the user's session)
  admin.ts         Service-role client, bypasses RLS, server-only
lib/validation/    Rules shared by forms and server actions
  password.ts      New-password strength rules (sign-up and reset)
  phone.ts         Phone number validation (libphonenumber-js)
  portfolioLinks.ts  Portfolio URL and platform-domain checks
proxy.ts           Refreshes the Supabase session on each request
supabase/migrations/   SQL schema, applied in numeric order
```

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your Supabase project URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your Supabase anon key>
   SUPABASE_SERVICE_ROLE_KEY=<your Supabase service role key>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Keep it server-side only and never commit it. `.env*` is already in `.gitignore`.

3. Apply the migrations in `supabase/migrations/` to your Supabase project, in numeric order, using the SQL editor or the Supabase CLI. Migrations `11` and `12` create the trigger that adds a `public.users` row when someone signs up, so sign-up fails without them.

4. In Supabase, go to Authentication, then URL Configuration, and add `http://localhost:3000/auth/callback` to the redirect URLs.

5. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |


## Notes for contributors

- This Next.js version has breaking changes from earlier releases. Read the relevant guide in `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`).
- `app/data/*.ts` holds only data that will later move to Supabase. Static content such as FAQs and navigation stays inline in components.
