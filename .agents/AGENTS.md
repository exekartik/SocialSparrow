# SocialSparrow Project Rules & Reference Specifications

## Reference Target Application
- **URL**: `https://scheduler-gs.vercel.app/`
- **Goal**: SocialSparrow is a full-featured clone of this social media scheduling application. All pages, features, UI flows, animations, and backend functionality must mirror and enhance this reference site.

## Core Pages & Required Functionality:

1. **Landing Page (`/`)**:
   - Navigation header with Features, How it works, Pricing, and Dashboard CTA.
   - Hero section with AI-Powered automation badges, headline, subheadline, interactive preview mockup, and call-to-action buttons.
   - Features grid (Smart Scheduling, AI Generator, Activity Dashboard, Multi-Platform Sync, Instant Publishing, Hashtag Suggestions).
   - How it works step walkthrough, Testimonials grid, Pricing tier cards (Free, Pro, Agency), and Footer navigation.

2. **Authentication (`/login`)**:
   - Sign In and Sign Up toggle mode.
   - Email, password, and name input fields.
   - Direct redirection to `/dashboard`.

3. **Dashboard (`/dashboard`)**:
   - Sidebar navigation: Dashboard, Accounts, Scheduler, AI Composer, plus User profile widget with Sign Out.
   - Metric cards: Scheduled Posts counter, Published Posts counter, Connected Accounts counter.
   - Live activity feed showing recent publication events with platform tags and timestamps.

4. **Connected Accounts (`/accounts`)**:
   - Connected platforms summary (Twitter/X, LinkedIn, Facebook, Instagram).
   - Connect Account modal allowing interactive platform selection.
   - Disconnect / remove account actions.

5. **Post Scheduler (`/scheduler` / `/schedule`)**:
   - Multi-platform targeted post composer (Platform buttons, 280-char textarea counter, drag-and-drop media file uploader, Date & Time pickers).
   - Schedule Post trigger adding items to the Upcoming queue.
   - Upcoming queue timeline & Published post history.

6. **AI Composer (`/AIcomposer` / `/ai-composer`)**:
   - Post topic idea prompt textarea, Tone selector pills, and Generate action.
   - Live AI post generation preview plate.
   - One-click "Schedule Post" modal integration pre-filling the post content into the scheduler queue.

## Design Aesthetic:
- High-end dark graphite plate layout (`#121214`, `#1a1a1e`, `#202025`, `#2c2c33`) with electric orange accent highlights (`#ff6b00` / `#f97316`).
- Interactive animations, WebGL `SpecularButton` hover shine effects, smooth page transitions, and responsive mobile sidebar drawer.
