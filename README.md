
# RE/LAB — Phase 3

Clean, focused study workspace with Pomodoro rooms, state mock exams, flashcards, progress, and a simple Free vs Pro model.

## What’s included
- Hero with image carousel (uses images in `/assets`)
- Study Room with free vs subscriber video lists
- Mock Exams (GA sample): 10‑Q free quiz; 50‑Q Pro exam (placeholder)
- Flashcards + progress saved to localStorage
- Daily checklist
- Pricing section + testimonials
- Temp auth modal (dev only) that toggles Pro on this device

## Repo structure
```
index.html
styles.css
app.js
assets/     # hero images go here
data/
  questions-ga.json
```

## How to use
1. Upload this folder to a new GitHub repo in your `relab-studio` org (e.g., `relab.studio`).
2. Enable **Settings → Pages → Branch = main, Folder = root**.
3. Your site goes live at `https://relab-studio.github.io/<repo>` (or root if repo = `relab-studio.github.io`).

## Payments (secure)
- For a no‑server MVP, create a **Stripe Payment Link** for the subscription and set it on `#buyBtn`. Stripe hosts the checkout (PCI compliant).
- For proper gating, add Firebase Auth + a tiny Netlify/Cloudflare Worker to verify Stripe webhooks and set a custom claim like `pro=true`.
- Swap the temporary modal with OAuth (Google/Email) and check `pro` on page load to unlock Pro features.

## Security hardening
- Always serve over HTTPS (GitHub Pages does this).
- Add a Content Security Policy and referrer policy using a `_headers` file if deploying to Netlify.
- Don’t expose API keys in client code; use serverless functions for secrets.

## Next steps
- Add more states and real question banks.
- Replace placeholder videos with your curated lists.
- Build a real dashboard page with scores history.
