# Customer Compass — Presentation Notes

Talking points for the three questions that matter most to a Microsoft audience:
**identity (Entra ID)**, **accessibility & inclusion**, and **security**. Plus the
roadmap answer for *"where does the issue come from?"*

---

## 1. Identity: Why Microsoft Entra ID and Single Sign-On (SSO)

### What we built
- The app authenticates with **Microsoft Entra ID** using **MSAL** (`@azure/msal-react`),
  the same identity platform that backs Microsoft 365, Azure, and Teams.
- We request the minimal **`User.Read`** Microsoft Graph scope — just enough to greet the
  user by name and show their avatar. Nothing more.
- There is a **built-in demo sign-in fallback**, so the app is fully usable in a hackathon /
  no-tenant environment and "lights up" real SSO the moment an app registration is added.

### Why SSO is useful (the talking points)
- **No new passwords.** Support engineers already sign in to Microsoft every morning.
  SSO means *zero* extra credentials to create, remember, rotate, or leak. This is the
  single biggest reduction in attack surface you can make.
- **One identity, everywhere.** The same account that opens Teams, Outlook, and the Azure
  portal opens Customer Compass. That's what makes it feel like a native part of the
  Microsoft day-to-day, not a bolt-on tool.
- **Central control for IT.** Admins manage access, **Conditional Access** (e.g. require a
  compliant device or MFA), and offboarding from **one place**. Disable the account → access
  to Compass is revoked instantly. No orphaned logins.
- **Audit & compliance.** Every sign-in is logged in Entra. Who accessed customer-incident
  tooling, when, and from where is answerable out of the box.
- **Trust signal for customers.** Handling customer incidents means handling sensitive data.
  "We authenticate with the same enterprise identity platform Microsoft uses internally"
  is a strong story.

### Why we picked the minimal scope
- `User.Read` only. We follow **least privilege** — the app never asks for mailbox, files,
  or directory access it doesn't use. Easy consent, easy security review.

### One-line summary for a slide
> *Customer Compass uses Microsoft Entra ID SSO so support engineers sign in with the account
> they already have — no new passwords, central IT control, full audit, least-privilege access.*

---

## 2. Where does the issue come from? (Future steps / integration roadmap)

**Today (MVP):** the engineer **pastes or types** the customer issue into the analyze box.
The backend (`POST /api/analyze`) finds similar past incidents and generates guidance.
This keeps the demo self-contained and provider-agnostic.

**Next steps — pull the issue automatically from where the work already lives:**

| Source | How it plugs in | Value |
| --- | --- | --- |
| **Dynamics 365 Customer Service** | Read the active case/ticket via Graph/Dataverse API | Analyze the real support case with one click |
| **Azure DevOps / GitHub Issues** | Pull the work item the engineer is on | Engineering-side incidents flow straight in |
| **ServiceNow / Zendesk** | Connector or webhook on ticket creation | Meet enterprises where their ITSM already is |
| **Microsoft Teams** | A message-extension / bot: right-click a message → "Analyze in Compass" | Zero context-switching for support chats |
| **Outlook** | Add-in on a customer email → analyze the thread | Turn an inbound complaint into guidance instantly |
| **Azure Monitor / Service Health** | Telemetry + alerts feed the *Proactive Rescue* roadmap | Detect issues **before** the customer reports them |

**Why this matters:** because we authenticate with **Entra ID**, the *same token* can (with the
right consented scopes) call Graph, Dataverse, or Azure APIs **on behalf of the signed-in user**.
SSO isn't just a login convenience — it's the foundation that lets us pull the issue securely
from any Microsoft source **as that user**, respecting their existing permissions.

---

## 3. Accessibility & Inclusion

> Yes — accessibility is a first-class requirement at Microsoft. Microsoft publishes the
> **Inclusive Design** toolkit and holds products to **WCAG 2.x** and its own accessibility
> standard. We built Customer Compass to reflect that.

### What is already implemented

**Color-blind users (~8% of men)**
- We **never rely on color alone** to convey meaning. Status is always **icon + text + color**:
  a warning shows a warning icon *and* a label, success shows a check icon *and* a label.
  A color-blind user gets the same information whether or not they can distinguish red/green.
- The Fluent communication-blue palette and neutral grays are chosen for strong contrast.

**Low-vision users**
- **WCAG-aimed contrast** between text and backgrounds across the redesign.
- **Visible keyboard focus**: a 2px brand-colored focus ring (`:focus-visible`) on every
  interactive element, so you can see exactly where you are.
- Text uses relative sizing and the Segoe UI system stack, so OS-level "make text bigger"
  and browser zoom reflow cleanly.

**Totally blind users (screen readers — Narrator, JAWS, NVDA)**
- **Semantic HTML**: real `<button>`, `<nav>`, `<main>`, heading hierarchy — not clickable `<div>`s.
- **ARIA where it counts**: the app launcher, mobile menu, and user menu expose
  `aria-label` and `aria-expanded` so a screen reader announces them correctly.
- **Decorative icons are hidden** from assistive tech (`aria-hidden="true"`) so the screen
  reader reads the meaningful label, not "image, image, image."
- The app logo/favicon carries a descriptive `aria-label`.

**Motion-sensitive users (vestibular disorders)**
- We honor **`prefers-reduced-motion`** — animations are disabled for users who request it
  at the OS level.

**Deaf / hard-of-hearing users**
- The product is **text-first**: all guidance, customer-communication drafts, and analysis are
  written content, not audio/video — so there's no audio barrier today.

### What we recommend next (roadmap — honest about gaps)
- **Captions/transcripts** if we ever add demo videos or voice features.
- **High-contrast mode** support via `prefers-contrast` and Windows High Contrast testing.
- **Full keyboard-trap audit** of the flyout menus and an automated **axe / Accessibility
  Insights** pass in CI.
- **Real screen-reader testing** with Narrator/NVDA on each release.
- **Localization / RTL** support for global teams.

### One-line summary for a slide
> *Accessibility is built in, not bolted on: status is conveyed by icon + text (not color alone),
> visible focus rings, semantic HTML + ARIA for screen readers, and reduced-motion support —
> aligned with Microsoft Inclusive Design and WCAG.*

---

## 4. Security — Microsoft's #1 priority

> Security is Microsoft's top priority (the **Secure Future Initiative**). Customer Compass
> embraces "secure by design / secure by default."

### How the app embraces it

**Identity & access (the front door)**
- **Entra ID SSO** instead of homegrown auth — we don't store or handle passwords at all.
- **Least privilege**: only the `User.Read` scope is requested.
- Token cache uses **`sessionStorage`** — credentials are cleared when the browser session ends,
  not left sitting in long-lived storage.
- Ready for **Conditional Access & MFA** enforced centrally by IT — the app inherits those
  protections for free.

**Secrets & configuration**
- **No secrets in the client.** The Entra *client ID* is a public identifier (safe to ship);
  the **Azure OpenAI key stays server-side only** and is read from environment variables.
- `.env.local` is git-ignored; `.env.example` documents the variables without leaking values.
- Public client values are prefixed `NEXT_PUBLIC_`; everything else stays on the server.

**Architecture / data handling**
- The AI call runs through a **server-side API route** (`/api/analyze`) — the browser never
  talks to Azure OpenAI directly and never sees the key.
- **Provider abstraction** lets us swap the mock client for Azure OpenAI without changing the
  app, and keeps the AI integration in one auditable place.
- Defaults are safe: with no keys configured, the app runs on **mock data** — it never fails
  open to an unauthenticated external call.

**Supply chain & build hygiene**
- The production build **passes TypeScript type-checking** with no errors — type safety is a
  real first line of defense.
- We track dependency advisories (`npm audit`) and can wire **Dependabot / GitHub Advanced
  Security** into CI.

### What we recommend next (roadmap)
- **On-behalf-of (OBO) flow** when we start pulling tickets from Graph/Dataverse, so the app
  acts strictly within the signed-in user's permissions.
- Server-side **authorization checks** on `/api/analyze` (require a valid Entra token) before GA.
- **Content Security Policy**, security headers, and rate limiting on the API route.
- **PII handling policy** for customer-incident text sent to the model (redaction, retention,
  region/data-residency via Azure OpenAI).
- Resolve the 2 moderate transitive `npm audit` advisories before production.

### One-line summary for a slide
> *Secure by design: enterprise SSO (no passwords), least-privilege scopes, server-side secrets,
> mock-safe defaults, and a clear path to on-behalf-of access and full authorization — built on
> the same identity platform Microsoft trusts internally.*

---

## Quick "expected questions" cheat sheet

- **"Why not just a username/password login?"** → Passwords are the #1 breach vector. Entra SSO
  removes that risk, gives IT central control, and feels native to Microsoft users.
- **"Where does the customer issue come from?"** → Today: pasted in. Roadmap: pulled from
  Dynamics 365, Teams, Outlook, Azure DevOps, ServiceNow — securely, as the signed-in user, via
  the Entra token.
- **"Is this usable by people with disabilities?"** → Yes — icon+text (not color), focus rings,
  semantic HTML + ARIA for screen readers, reduced-motion; aligned to WCAG and Inclusive Design.
- **"How is customer data protected?"** → No passwords stored, least-privilege scope, server-side
  keys, session-only token cache, mock-safe defaults, ready for Conditional Access/MFA.
- **"What's the demo sign-in?"** → A fallback so the app works without a tenant; real Entra SSO
  turns on automatically once an app registration is configured.
