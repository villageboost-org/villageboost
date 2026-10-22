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
| [@marsidev/react-turnstile](https://github.com/marsidev/react-turnstile) | 1.6 | Cloudflare Turnstile bot-check widget on auth forms |
| [Supabase JS](https://supabase.com/docs/reference/javascript) and [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side) | 2.110 / 0.12 | Auth and database clients for browser, server and admin use |
| [ESLint](https://eslint.org) with `eslint-config-next` | 9 | Linting |

### External services

| Service | Used for |
| --- | --- |
| [Supabase](https://supabase.com) | PostgreSQL database, Auth (email and password), Row Level Security policies |
| [Resend](https://resend.com) | Custom SMTP provider for Supabase auth emails (sign-up confirmation, password reset) |
| [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | CAPTCHA alternative that blocks automated sign-ups and logins. Tokens are verified by Supabase Auth |
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
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your Cloudflare Turnstile site key>
   ```

   `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Keep it server-side only and never commit it. `.env*` is already in `.gitignore`.

3. Apply the migrations in `supabase/migrations/` to your Supabase project, in numeric order, using the SQL editor or the Supabase CLI. Migrations `11` and `12` create the trigger that adds a `public.users` row when someone signs up, so sign-up fails without them.

4. In Supabase, go to Authentication, then URL Configuration, and add `http://localhost:3000/auth/callback` to the redirect URLs.

5. Set up Cloudflare Turnstile:
   - In the Cloudflare dashboard, create a Turnstile widget (Managed mode) and add `localhost` and your production domain to its hostnames.
   - Put the **site key** in `.env.local` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. It is public by design.
   - Put the **secret key** only in Supabase, under Authentication, then Attack Protection, with Turnstile selected as the CAPTCHA provider. It never goes in the codebase.

   Turn on CAPTCHA protection in Supabase only after every auth form sends a token. Once it is on, Supabase rejects any sign-up, login or password-reset request without a valid token.

6. Start the dev server:

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
- Turnstile: the widget sits inside each auth `<form>` and adds a hidden `cf-turnstile-response` field, which the server action passes to Supabase as `captchaToken`. Each token works only once, so forms reset the widget after every server response. The widget uses `appearance: "interaction-only"`, so most visitors never see it. Wired up on login, forgot password, sign-up (step three) and resend confirmation. The sign-up wizard isn't a `<form>`, so `SignUpWizard` reads the token with `turnstileRef.current?.getResponse()` and adds it to the form data itself.
