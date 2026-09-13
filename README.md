# KUC Law Students' Union — Website

A static site (Eleventy) with a self-service content editor (Decap CMS) so any current or future
executive can update text, photos, the exec team, and announcements — without a developer and
without anyone being able to lock the union out again.

## Local development

```bash
npm install
npm run dev
```
Opens at http://localhost:8080 with live reload.

```bash
npm run build
```
Builds the static site into `_site/`.

## Deploying (one-time setup)

You need three free accounts: **GitHub** (owns the code), **Netlify** (hosts the site + powers
the CMS login + collects form submissions). Create these under an account the *union* controls
(e.g. a shared union Gmail), not a single individual's personal account — that's what caused the
lockout last time.

1. **Push this folder to a new GitHub repo**
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/YOUR-ORG/kuclsu-site.git
   git push -u origin main
   ```

2. **Create a Netlify site from that repo**
   - netlify.com → "Add new site" → "Import an existing project" → pick the GitHub repo.
   - Build command: `npm run build` — Publish directory: `_site` (already set in `netlify.toml`,
     Netlify should detect it automatically).

3. **Turn on the CMS login (Netlify Identity + Git Gateway)**
   - In the Netlify site dashboard: Site configuration → Identity → Enable Identity.
   - Identity → Registration → set to **Invite only** (so strangers can't self-register as editors).
   - Identity → Services → Git Gateway → Enable Git Gateway.
   - Identity → Invite users → invite each current executive's email. They'll get an email to set
     a password, then can log in at `https://YOUR-SITE.netlify.app/admin/`.

4. **Point your new domain at Netlify**
   - Once you've bought the domain: Netlify → Domain management → Add a domain → follow the DNS
     instructions Netlify gives you (usually just changing nameservers or adding a couple of
     records at your registrar).

5. **Update `admin/config.yml`**
   - Replace `REPLACE-WITH-YOUR-NETLIFY-OR-CUSTOM-DOMAIN` (two lines near the top) with your real
     domain once you have it, commit, and push.

6. **Update `src/_data/site.json`** (or do this via the CMS under "Site Settings")
   - Set the real contact `email` once you decide it (see warning below) — it currently has a
     placeholder.

## Contact form submissions

The Support LSU and Contact pages use **Netlify Forms** — no backend code needed. Submissions
show up automatically in Netlify → your site → Forms. You can set up an email notification there
(Site configuration → Forms → Form notifications) so submissions land in an inbox.

## Editing content day-to-day

Go to `/admin/` on your deployed site, log in, and edit:
- **Home Page** — hero text, welcome message, alumni/announcement blurbs
- **Site Settings** — phone, email, address, social links
- **Site Pages** — About Us, Support LSU, Contact, Campus Chambers, and the 5 Dr. Attakora Legal
  Tree pages (including their Google Drive links)
- **Executive Team** — add/remove/reorder members, upload photos
- **Announcements** / **Events** — add new posts, they show on the homepage automatically

## ⚠️ Things that need your attention before/at launch

1. **The union's real email address.** The old site used `hello@kuclawstudentsunion.com`. That
   domain **no longer belongs to the union** — as of this rebuild it redirects to an unrelated
   gambling spam site (`akunslotdemogratis.org`), meaning the domain lapsed and was picked up by
   someone else. **Do not keep using any @kuclawstudentsunion.com email** — anything sent there
   may now go to a stranger. Set up a fresh email on your new domain (or a Gmail in the meantime)
   and update it in Site Settings.
2. **Executive team is out of date.** The three names seeded in "Executive Team" (Suad Mohammed
   Saani, Addo Benjamin Armah, Frederick Obliquaye Commey) are the last ones visible on the old
   site, from the 2024/2025 academic year. Update this immediately via the CMS with the current
   exec.
3. **Full "Welcome Message" text is missing.** Only a one-line excerpt survived from the old site
   (the popup that held the full letter was broken even before the domain lapsed). Ask the current
   President/VP to write a fresh one.
4. **Some resource links were never filled in on the old site** (Past Questions by level,
   "Past Questions of other schools", both Journals links) — flagged with `**To do**` notes on
   those pages. Add the Google Drive links via the CMS once you have them.
5. **Google Drive folders**: the Law Reports / Textbooks / Past Questions links carried over from
   the old site point to Google Drive folders that should be unaffected by the domain issue —
   but confirm the union still has owner/edit access to each one (whoever originally created them
   may no longer be involved).
6. **Chamber assignments PDF** is the one from 28 Oct 2024 — replace with a current list via the
   CMS when available.
