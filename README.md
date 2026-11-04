# HER TABLE SOCIETY · website

Astro 5 + Tailwind CSS v4 + TypeScript. Static output for Cloudflare Pages, with one Pages Function for the notify / lead forms.
Built from the Figma page **“HER TABLE · Final Design (Website)”** (file `lizjxynBPTaHVuxZVZHN1C`, node `189:770`).

## Run it

Requires Node.js **20.3+** (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in ./dist
npm run preview    # serve ./dist
npm run check      # Astro + TypeScript diagnostics (0 errors)
```

## Structure

```
src/
  styles/global.css        Design tokens (@theme): colors, fonts, breakpoints, fluid type scale (t-*), utilities
  data/site.ts             ALL copy and content: nav, home, events, TABLE 01, categories, plans, FAQ, flows
  data/images.ts           Image registry (one key per photo, exported from Figma)
  assets/images/           Photos (converted to responsive WebP at build time)
  lib/                     events.ts (badge / panel state logic), forms.ts (validation, lead forms),
                           flow.ts + plans.ts (join / checkout state), clientEvents.ts, badges.ts, icons.ts
  components/
    ui/        Button, Badge, Chip, Icon, Input, Checkbox, Alert, InfoField, Mixed, Photo, Perforation, TextLink
    blocks/    EventCard, TicketPanel, NotifyForm, NotifyCard, PlanCard, FaqItem, BenefitRow, KeyFact, StepItem,
               StepCard, PillarCard, ExperienceCard, OptionCard, FlagCard, OrderSummary, MembershipSummary,
               OrderLine, JoinStepper, ChoiceTile, ReviewRow, MemberPrompt, CancellationPolicy, MembersFirstNote,
               StripeHandoff, AccountNav, AccountCard, MembershipCard, PaymentCard, TicketRow, UpcomingTickets,
               EmptyState, ChangeSummary, SectionHead
    sections/  HomeHero, SocietySection, PillarsSection, CalendarSection, Table01Section, FlagMarquee,
               PrivacySection, OptionsSection, MembersFirstSection, UpsellSection
    layout/    SiteNav (+ mobile menu), SiteFooter, CheckoutHeader, Wordmark
    templates/ EventDetail, CheckoutForm, JoinReview, MembershipPage
  layouts/     BaseLayout (SEO head, JSON-LD), FlowLayout (checkout / join), AccountLayout, LegalLayout
  pages/       every route (below)
public/fonts/  Self-hosted Cormorant Garamond + Jost (woff2, latin). No Google Fonts request.
functions/api/lead.ts      POST /api/lead (notify forms)
```

Each component's header comment names the Figma component it implements.

## Pages

| Route | Figma |
| --- | --- |
| `/` | 01 Home |
| `/events` (`?category=dinner` etc.) | 02 Explore Events (filters work client-side) |
| `/events/[slug]` | 03 Event detail. Panel state comes from the event data |
| `/table-01` | 03.5 Date announced soon · TABLE 01 |
| `/checkout`, `/checkout/redirect`, `/checkout/payment-failed`, `/checkout/confirmed` | 04 Buy a ticket |
| `/membership`, `/membership/full` | 05 Become a Member / Membership full |
| `/join`, `/join/details`, `/join/confirm-age`, `/join/review`, `/join/redirect`, `/join/payment-failed`, `/join/welcome` | 06 Join flow |
| `/account/login`, `/account`, `/account/tickets`, `/account/tickets-empty`, `/account/switch-plan`, `/account/cancel`, `/account/intro-ending`, `/account/payment-due`, `/account/update-card`, `/account/details` | 07 Member account |
| `/styleguide` (noindex) | 09 Components: tokens, every component and all six ticket-panel states |
| `/privacy-policy`, `/terms`, `/thank-you`, `/404` | Utility (legal text is a placeholder) |
| `/calendar/[slug].ics` | “Add to calendar” (Apple); Google / Outlook links are generated |

## Editing content (`src/data/site.ts`)

- **Events**: add an object to `events`. Keep `price: null` until Hermen confirms it. Cards then say “Pricing announced soon” and the ticket panel shows the notify form. Set `price` (and `memberPrice`) to switch to on-sale with quantity stepper and total.
- **access**: `public` · `member-price` · `early-access` · `members-only`. **status**: `available` · `few-left` · `sold-out` · `date-soon`. Badges, buttons and the panel state follow automatically (`src/lib/events.ts`).
- **TABLE 01**: `table01`. Date, venue, capacity and price stay “Coming soon”.
- **Membership**: `plans`, `membership.benefits`, `membership.faq`. Set `membership.isFull = true` to switch `/membership` to the full state.
- **Photos**: replace a file in `src/assets/images` with the same name.

## Backend hooks (not in this front-end)

- **Stripe**: checkout and join store the form in `sessionStorage` and go to the hand-off page (`/checkout/redirect`, `/join/redirect`), which continues to the confirmation page after 3.5 s. Replace that with a Stripe Checkout Session redirect (see comments in `CheckoutForm.astro`, `StripeHandoff.astro`). “Update card” should open the Stripe customer portal.
- **Accounts**: account pages show the Figma example member (`demoMember`). Log in currently opens `/account`.
- **Emails, renewals, reminders, member cap**: backend (Stripe webhooks + email service). Email designs are in Figma section 08.
- **Notify forms**: POST to `/api/lead`. Set `LEAD_WEBHOOK_URL` in Cloudflare (Settings → Environment variables) to forward leads (e.g. to a CRM or Zapier). Without it, leads are logged.

## Deploy (Cloudflare Pages)

Build command `npm run build`, output `dist`, environment variable `NODE_VERSION=20`. `public/_headers` sets security and cache headers.
