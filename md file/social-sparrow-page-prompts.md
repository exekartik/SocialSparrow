# Social Sparrow — Page Build Prompts

Paste each block below into your site builder (v0, Lovable, Cursor, etc.) one at a time. Every prompt tells the tool to reuse your existing design system, so run them in whatever order you like — they don't depend on each other.

---

## PRODUCT

### 1. Features

```
Create a "Features" page for Social Sparrow, an AI-powered social media scheduling
tool for social media and community managers. Match the existing site's design
system exactly (fonts, colors, spacing, button styles, existing components).
Fully responsive.

CONTEXT
This page goes deeper than the homepage's feature teaser — it's the full
breakdown of what Social Sparrow can do, for someone actively comparing tools.

SECTIONS TO INCLUDE

1. Hero
   - Headline: what makes Social Sparrow different, one line
   - Subheadline: one sentence

2. Feature groups (4-5 groups, each with 2-3 sentence description and a
   supporting visual/screenshot placeholder)
   - Multi-platform scheduling: publish to Instagram, X, LinkedIn, Facebook,
     TikTok from one calendar
   - AI content assist: caption generation, hashtag suggestions, tone
     matching per platform
   - Smart send-time recommendations: AI predicts each audience's best
     posting windows
   - Team collaboration: shared calendars, approval workflows, client
     permissions (for agencies)
   - Analytics: post performance across platforms in one dashboard

3. Comparison strip (optional)
   - "Social Sparrow vs. doing it manually" — 3 columns: time saved,
     consistency, error reduction

4. CTA
   - "Try it free" / "See pricing" — match homepage CTA button

TONE
Confident, specific, benefit-first. Avoid vague SaaS buzzwords like
"seamless" or "synergy."

TECHNICAL
- Reuse existing Card, Section, and Button components
- Use existing color tokens; don't introduce a new palette
- Icon set should match whatever's already used on the homepage
```

### 2. How It Works

```
Create a "How It Works" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive.

CONTEXT
This page walks a first-time visitor through the actual product flow, from
signup to a published post, so they can picture using it before signing up.

SECTIONS TO INCLUDE

1. Hero
   - Headline: "From idea to published post in minutes" (or similar)
   - One-line subheadline

2. Step-by-step flow (3-4 numbered steps, each with icon + short description)
   - Step 1: Connect your accounts (Instagram, X, LinkedIn, Facebook, TikTok)
   - Step 2: Draft or generate content (write manually or let AI draft
     captions/hashtags)
   - Step 3: Schedule across platforms from one calendar
   - Step 4: Track performance and refine

3. Visual walkthrough
   - Placeholder for a product screenshot or short demo per step

4. FAQ (optional, 3-4 short Q&As)
   - "Do I need separate logins for each platform?"
   - "Can I edit AI-generated captions?"
   - "What happens if a post fails to publish?"

5. CTA
   - Match homepage's primary CTA

TONE
Clear, step-by-step, reassuring — someone worried this is complicated should
come away thinking it's simple.

TECHNICAL
- Use a numbered step/stepper component if one exists in the codebase,
  otherwise build one matching existing spacing rules
- Reuse existing Section and Button components
```

### 3. Pricing

```
Create a "Pricing" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive.

CONTEXT
Standard SaaS pricing page with tiered plans. Use placeholder pricing/limits
below — swap in real numbers before publishing.

SECTIONS TO INCLUDE

1. Hero
   - Headline: "Simple pricing that scales with you" (or similar)
   - Monthly/Annual billing toggle (annual shows a discount badge, e.g.
     "Save 20%")

2. Pricing tiers (3 cards, middle one highlighted as "Most popular")
   - Starter: for solo creators — [X] connected accounts, [X] scheduled
     posts/month, basic AI captions — $[placeholder]/mo
   - Pro: for small teams/agencies — more accounts, unlimited scheduling,
     full AI suite, team collaboration — $[placeholder]/mo
   - Agency: for managing multiple clients — everything in Pro + client
     workspaces, approval workflows, priority support — $[placeholder]/mo
     or "Contact us"

3. Feature comparison table
   - Rows: connected accounts, scheduled posts, AI captions, analytics,
     team seats, client workspaces, support level
   - Columns: Starter / Pro / Agency

4. FAQ (4-5 questions)
   - Can I change plans anytime? Is there a free trial? What happens if I
     go over my post limit? Nonprofit/student discounts?

5. CTA
   - "Start free trial" on each tier, matching existing button style

TONE
Transparent, no hidden-fee language, straightforward numbers.

TECHNICAL
- Reuse existing Card and Table components if present
- Middle tier gets existing "highlighted/featured" card treatment if one
  exists
- Toggle component should match any existing toggle/switch styling
```

### 4. Changelog

```
Create a "Changelog" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive.

CONTEXT
A running, dated log of product updates. Structure it so new entries can be
added at the top over time.

SECTIONS TO INCLUDE

1. Header
   - Title: "Changelog"
   - One-line subheadline: "Here's what's new in Social Sparrow"

2. Timeline of entries (reverse chronological), each with:
   - Version number and date (e.g. "v1.0 — Launch")
   - Tag badges: Added / Improved / Fixed
   - 2-4 bullet points describing the change in plain language

3. Seed with one placeholder launch entry
   - "v1.0 — [Launch date]: Added multi-platform scheduling, AI caption
     generation, and analytics dashboard"

4. Optional: subscribe to updates
   - Small email input, only if the codebase already has an email capture
     component

TONE
Short, factual, scannable — no marketing fluff, just what changed.

TECHNICAL
- Use existing Badge/Tag component for Added/Improved/Fixed labels
- Timeline layout should reuse existing list/card spacing patterns
```

---

## COMPANY

### 5. Blog

```
Create a "Blog" index page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive. This is the listing page only, not individual post templates.

CONTEXT
A landing page for content aimed at social media and community managers —
tips, product updates, industry trends.

SECTIONS TO INCLUDE

1. Header
   - Title: "Blog" or "Resources"
   - One-line subheadline about what the blog covers

2. Featured post (large card at top)
   - Placeholder title, excerpt, image, author, read time

3. Post grid (3-column card grid)
   - Each card: thumbnail, category tag, title, excerpt, author, date
   - Seed with 3-6 placeholder cards across categories like "Strategy,"
     "Product Updates," "Case Studies"

4. Category filter (optional)
   - Simple tab/pill filter row above the grid

5. Newsletter signup strip (optional, only if email capture component exists)

TONE
Helpful, practical — this is a resource hub, not a sales page.

TECHNICAL
- Reuse existing Card component for post previews
- Category tags reuse existing Badge/Tag styling
- Mark placeholder post content clearly for replacement
```

### 6. Careers

```
Create a "Careers" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive.

CONTEXT
A page for potential hires — culture, values, and open roles. Use placeholder
roles if there are no real openings yet.

SECTIONS TO INCLUDE

1. Hero
   - Headline: "Help us build the future of social media management" (or
     similar)
   - One-line subheadline

2. Why work here (3-4 short value points)
   - e.g. remote-first, small team with real ownership, building something
     people use daily

3. Open positions
   - List/card format: role title, team (Engineering/Design/Growth),
     location (Remote), apply link
   - If no real openings exist, include a placeholder card: "Don't see your
     role? We're always open to meeting great people" with a contact email

4. CTA
   - "See open roles" or "Get in touch" matching existing button style

TONE
Genuine, low-hype — avoid generic "we're a family" language, be specific
about what the work is actually like.

TECHNICAL
- Reuse existing Card and Button components
- Keep it easy to update — one repeatable card component per role
```

### 7. Press

```
Create a "Press" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive.

CONTEXT
A resource page for journalists/media — company facts, logo assets, press
mentions. Use placeholders where real assets/mentions don't exist yet.

SECTIONS TO INCLUDE

1. Header
   - Title: "Press"
   - One-line subheadline: "Media resources and company information"

2. Company boilerplate
   - Short 2-3 sentence "about Social Sparrow" blurb, reusable for articles

3. Brand assets
   - Downloadable logo pack (light/dark), brand color codes — placeholder
     download buttons are fine for now

4. Press mentions (optional)
   - Simple list/logo row of publications — show an empty state ("No press
     mentions yet") if none exist

5. Media contact
   - Email address / contact form for press inquiries

TONE
Formal, factual, no marketing language — this page is for journalists.

TECHNICAL
- Reuse existing Card and Button components
- Logo download buttons trigger file downloads (placeholder asset paths OK)
```

---

## LEGAL

> **Before publishing:** the four pages below are starter templates only. Have an actual lawyer review them before they go live — this matters more than usual here since Social Sparrow connects to third-party platforms (Instagram, X, LinkedIn, Facebook, TikTok) and handles account tokens and user content. I'm not a lawyer and these prompts are meant to get you a solid structural draft, not a compliant final policy.

### 8. Privacy Policy

```
Create a "Privacy Policy" page for Social Sparrow, an AI-powered social media
scheduling tool. Use a simplified version of the site's design system — legal
pages should be plain-text/typography-focused, minimal decoration. Fully
responsive.

CONTEXT
This is a STARTER TEMPLATE ONLY — flag in a code comment that it needs lawyer
review before publishing.

SECTIONS TO INCLUDE

1. Title + last updated date
2. Introduction — what this policy covers, who it applies to
3. Information we collect — account info, connected social account
   tokens/permissions, content you schedule, usage/analytics data
4. How we use your information — providing the service, improving AI
   recommendations, communications, billing
5. Third-party sharing — connected social platforms (via their APIs),
   payment processors, analytics tools; note we don't sell user data
6. Data retention & security — how long data is kept, link to Security page
7. Your rights — access, correction, deletion; GDPR/CCPA language as
   placeholder
8. Contact — email for privacy inquiries
9. Changes to this policy

TONE
Plain-English where possible, standard legal structure.

TECHNICAL
- Simple typographic layout: headings + paragraphs, reuse existing Section
  component
- Add a table of contents with anchor links if the page is long
```

### 9. Terms of Service

```
Create a "Terms of Service" page for Social Sparrow, an AI-powered social
media scheduling tool. Match the site's simple legal-page typography. Fully
responsive.

CONTEXT
This is a STARTER TEMPLATE ONLY — flag in a code comment that it needs lawyer
review before publishing.

SECTIONS TO INCLUDE

1. Title + last updated date
2. Acceptance of terms
3. Description of service (scheduling, AI content generation, connected
   platform publishing)
4. User accounts & responsibilities (accurate info, account security,
   acceptable use of connected social accounts)
5. Subscription & billing (plans, renewals, cancellations, refund policy
   placeholder)
6. Content ownership (user retains rights to their content; Social
   Sparrow's license to process/publish it on their behalf)
7. Prohibited uses (spam, platform ToS violations, illegal content)
8. Third-party platform dependency (acknowledges Instagram/X/etc. APIs and
   that availability depends on their policies)
9. Limitation of liability
10. Termination
11. Governing law (placeholder jurisdiction)
12. Contact information

TONE
Standard legal structure, plain-English explanations alongside formal
clauses where possible.

TECHNICAL
- Simple typographic layout, table of contents with anchor links
- Reuse existing Section component
```

### 10. Security

```
Create a "Security" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the existing site's design system exactly. Fully
responsive.

CONTEXT
Explains how user data and connected social accounts are protected. Use only
placeholder/generic claims — do NOT invent specific certifications (SOC 2,
ISO 27001, etc.) unless the company actually holds them; mark those sections
clearly as "add once obtained."

SECTIONS TO INCLUDE

1. Hero — "Security is built into everything we do" (or similar)
2. Infrastructure & encryption — data encrypted in transit and at rest
   (placeholder specifics), hosting provider mention
3. Account & access security — OAuth-based connections to social platforms
   (never storing platform passwords), 2FA availability
4. Data practices — least-privilege internal access, regular backups
5. Compliance (placeholder) — "Working toward [SOC 2 / GDPR compliance]" —
   clearly marked as placeholder, not a real claim
6. Responsible disclosure — email/contact for reporting security issues
7. Contact — security team email

TONE
Direct, reassuring, factual — avoid overstating certifications or
guarantees not yet in place.

TECHNICAL
- Reuse existing Section, Card, and icon components
- Keep layout simple and scannable — short paragraphs, icon + heading pairs
```

### 11. Cookies

```
Create a "Cookie Policy" page for Social Sparrow, an AI-powered social media
scheduling tool. Match the site's simple legal-page typography. Fully
responsive.

CONTEXT
This is a STARTER TEMPLATE ONLY — flag in a code comment that it needs
lawyer review before publishing, particularly for GDPR/ePrivacy compliance
if serving EU users.

SECTIONS TO INCLUDE

1. Title + last updated date
2. What cookies are (brief explanation)
3. Types of cookies used — essential (login sessions), functional
   (preferences), analytics (usage tracking), marketing (if applicable)
4. Third-party cookies — analytics providers, payment processor, social
   login if used
5. Managing cookie preferences — browser settings link, reference to the
   site's cookie consent banner if one exists
6. Changes to this policy
7. Contact

TONE
Plain-English, short sections, standard legal structure.

TECHNICAL
- Simple typographic layout, reuse existing Section component
- If a cookie consent banner exists, note it should link to this page
```
