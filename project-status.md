# Higashi Fukuoka School Festival 2026 — Project Status

*Last updated: 2026-05-12*

---

## Overview

This document summarizes the current state of the site, what decisions have been locked in, what remains to be built, and what the immediate next priorities are. It is derived from three sources:

- **`gemini_chat.md`** — the technical discussion that produced the stack and strategy decisions
- **`requests_from_executives.md`** — the formal brief from the digital committee
- **`stunning-homepage-plan.md`** — the consolidated design and architecture plan

---

## Schedule check

Per `requests_from_executives.md`:

| Milestone | Deadline | Status |
|---|---|---|
| Coming Soon page live | As soon as ready from start | ✅ **Complete** |
| Progress check | After Golden Week (May 7) | — |
| Site publication target | Week of May 11–15 | ⚠️ **Core routes built; awaiting CMS setup + GitHub secrets to deploy** |

The festival itself opens **June 12–13, 2026**. The domain is `https://schoolfes.hfhs-digital.app/`.

---

## What is built

### ✅ Coming Soon page

The coming soon page is complete and is the current active homepage. It establishes the full design identity of the site.

**What it shows:**
- Event name in Japanese (`東福岡学園祭 2026`) — large fluid display headline
- Eyebrow label: `HIGASHI FUKUOKA SCHOOL FESTIVAL 2026`
- Caption row: `Coming Soon` + hairline separator + `Jun 12–13, 2026`
- Live countdown to Jun 12, 2026 at 10:00 JST — four segments, blur-snap tick animation

**What it does not show yet (intentionally):**
- Logo — not available yet; no placeholder used
- CTA button, social links, or location — omitted by design

The page is switched on via `HOME_PAGE_VARIANT = 'coming-soon'` in `src/features/home/config.ts`. Switching to production requires changing one line in that file.

### ✅ Design system (realized, not just planned)

The design is live. Key decisions that are now fixed:

**Color palette (Tailwind tokens in `global.css` @theme):**
| Token | Value | Role |
|---|---|---|
| `festival-navy` | `#14304f` | Title, numbers, strong text |
| `festival-navy-soft` | `#2b5277` | Labels, captions |
| `festival-text` | `#17314f` | Body text |
| `festival-muted` | `#5c7694` | Secondary content |
| `festival-line` | `rgba(20,48,79,0.14)` | Borders, dividers |

**Background:** Layered radial gradients creating icy atmospheric depth — near-white + three light pools at corners and bottom center.

**Glow orbs:** Two blurred circles (lower-left warm blue, upper-right cool lighter blue) layered on top of the background inside `FestivalShell`.

**Typography:** Inter / Helvetica Neue / Arial. No Japanese web font yet. Negative letter-spacing (`-0.08em`) on the title and countdown numbers is the most important design decision — do not soften it.

**Animation:** One CSS `@keyframes countdown-tick` — opacity + blur fade with spring easing (`cubic-bezier(0.22, 1, 0.36, 1)`, 520ms). No Anime.js yet.

### ✅ Code architecture

The codebase is structured for easy future expansion:

```
src/
  components/
    festival-shell/       ← shared full-viewport page shell (coming-soon + 404)
    notice-bar/           ← ✅ fixed-position important-news pill
    site-header/          ← ✅ sticky header with event name link
    site-footer/          ← ✅ copyright footer
    site-page/            ← ✅ SiteHeader + Slot + SiteFooter wrapper
  features/
    home/
      config.ts           ← HOME_PAGE_VARIANT switch ('coming-soon' | 'production')
      home-page.tsx       ← delegates to variant
      loaders.ts          ← routeLoader$ for news preview (re-exported from route)
      pages/
        coming-soon-home-page.tsx   ← ✅ built
        production-home-page.tsx    ← ✅ built
  lib/
    microcms.ts           ← ✅ all fetch helpers and content types
  routes/
    index.tsx             ← re-exports from features/home/ + loader
    layout.tsx            ← ✅ global layout: important-news loader + NoticeBar
    404.tsx               ← ✅ complete, uses FestivalShell
    news/
      index.tsx           ← ✅ news listing
      [id]/index.tsx      ← ✅ article detail + onStaticGenerate
    [id]/index.tsx        ← ✅ CMS page route + onStaticGenerate
  global.css              ← Tailwind v4 @theme tokens + background + animation + .cms-body
```

**Tech installed and working:**
- Qwik + Qwik City
- Vite
- Tailwind CSS (v4, via `@tailwindcss/vite`)
- Biome (linter/formatter)
- Static adapter (SSG mode, `dist/` emits static HTML)

---

## What is not built yet

### ❌ Logo

The logo does not exist yet. When it arrives:
1. Place the SVG in `public/` (or `src/assets/` if it needs processing)
2. Add it above the eyebrow in the coming soon page — `clamp(40px, 6vw, 64px)` height
3. Add it to the production homepage hero
4. If it contains diamond geometry, extract that as a reusable decorative element

Note: Logo hasn't arrived yet. ~~What are they doing?~~ Keep waiting :D

### ✅ Production homepage

Built in `src/features/home/pages/production-home-page.tsx`. Active when `HOME_PAGE_VARIANT = 'production'` in `src/features/home/config.ts` (currently set to production).

Sections:
1. **Hero** — full-height atmospheric shell with glow orbs; eyebrow → display title → date+location caption → CTA button
2. **News preview** — 3 items from microCMS (shows empty state gracefully when CMS not connected)
3. **About** — static editorial section with festival concept copy
4. **Highlights** — 3-column grid of 6 card items (static placeholders; can be CMS-backed later)
5. **Schedule teaser** — Jun 12–13 two-day display with "詳細は近日公開" note

Placeholder copy (About, Highlights descriptions) should be updated once official copy from the committee arrives.

### ✅ microCMS integration

Fetch layer complete in `src/lib/microcms.ts`. All helpers return `null` gracefully when env vars are missing. Full integration is live once `MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY` are set.

Content models needed in the microCMS dashboard:
- `news` — title, body, publishedAt, category (ref), thumbnail (image)
- `pages` — title, body, description. Used by `/[id]` dynamic route and the 4 fixed-slug CMS pages (`access`, `cautions`, `with-children`, `need-help`)
- `important-news` — title (singleton), link (ref → news)

### ✅ News routes

Both routes are live and SSG-ready:
- `/news/` — full listing with date + category + title
- `/news/[id]` — article detail with `.cms-body` styled rich text + `onStaticGenerate`

### ✅ CMS-driven page route

`/[id]` dynamic route fetches `pages` from microCMS and renders with `.cms-body` styling. Throws 404 if not found.

The following 4 pages are also CMS-backed with fixed slugs (each keeps its own dedicated route file so the URL is stable even before CMS content is added):

| Route file | URL | microCMS slug |
|---|---|---|
| `access/index.tsx` | `/access/` | `access` |
| `cautions/index.tsx` | `/cautions/` | `cautions` |
| `with-children/index.tsx` | `/with-children/` | `with-children` |
| `need-help/index.tsx` | `/need-help/` | `need-help` |

Each page fetches `fetchCMSPage('<slug>')` and renders CMS title + body via `.cms-body` when available. When CMS is not connected (or the entry does not exist yet), the page falls back to a graceful "このページは近日公開予定です。" message rather than a 404.

### ✅ Deployment

GitHub Actions CI/CD workflow is in `.github/workflows/deploy.yml`:
- Triggers on push to `main`, `workflow_dispatch`, and `repository_dispatch` (microCMS webhook with `event_type: microcms-update`)
- Builds with `MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY` from GitHub Secrets
- Deploys `dist/` to `gh-pages` branch via `peaceiris/actions-gh-pages`
- `public/.nojekyll` and `public/CNAME` are present
- `adapters/static/vite.config.ts` origin set to `https://schoolfes.hfhs-digital.app`
- `src/entry.ssr.tsx` lang set to `ja`

### ❌ Anime.js

Anime.js has not been installed yet. The only animation currently in the site is the CSS countdown tick. Anime.js is planned for:
- Hero intro choreography on the production homepage
- Section reveal transitions
- Hover motion details

Per the Gemini discussion, use it in `useVisibleTask$` so it is never downloaded on initial load.

### ❌ PWA

Not yet implemented. Once the production site is stable, add `vite-plugin-pwa` for asset pre-caching. This is the key strategy for the school Wi-Fi constraint: load once, work offline.

### ❌ 3D map

Optional and not started. If built, the approach is:
- Default 2D map shown first (no Three.js cost)
- Three.js dynamically imported only when user explicitly requests 3D
- Draco-compressed `.glb` models
- FPS capped, antialiasing off
- Inform user of file size before load

Note: It's perfectly optional. We can just make it after everything is done.

---

## Technical decisions that are locked

These were decided in the Gemini discussion and reflected in the plan. They should not be revisited:

| Decision | What | Why |
|---|---|---|
| Framework | Qwik + Qwik City | Best for low-bandwidth interactive sites; resumability minimizes JS on initial load |
| Rendering | SSG (static site generation) | Content baked at build time; no API round-trips on weak school Wi-Fi |
| Styling | Tailwind CSS v4 | Already installed and wired |
| CMS fetch | Plain `fetch()`, no SDK | SDK adds no value here; smaller dependency surface |
| Animation | Anime.js via `useVisibleTask$` | Deferred load; zero cost for users who don't trigger it |
| Hosting | GitHub Pages (static) | Free, reliable, HTTP/2+, no server to maintain |
| Images | microCMS image API | Automatic resize + WebP conversion via URL params |
| No microCMS SDK | Excluded | SDK is just a fetch wrapper; adds bundle weight for no benefit |

---

## Immediate next priorities

In order:

1. **Set up microCMS** — create the 3 API schemas (`news`, `pages`, `important-news` singleton) in the microCMS dashboard
2. **Add GitHub Secrets** — `MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY` in the repo's Actions secrets
3. **First deploy** — push to `main` to trigger GitHub Actions; verify site at `https://schoolfes.hfhs-digital.app`
4. **Set up microCMS webhook** — `POST /repos/{owner}/{repo}/dispatches` with `event_type: microcms-update` for auto-rebuild on content changes
5. **Logo integration** — once asset is delivered, add to both the coming soon page and production homepage hero
6. **Update placeholder copy** — About section and Highlights descriptions need real copy from the committee
7. **Install Anime.js** and add entrance choreography to the production hero (load via `useVisibleTask$`)
8. **PWA** — add `vite-plugin-pwa` after production homepage is stable on the live URL
9. **3D map** — optional stretch goal

---

## Design rules that must be maintained

From `stunning-homepage-plan.md` (final design rules section):

1. All text is navy on icy white — no color accents, no bright hues
2. The background system (layered radial gradients + blur orbs) must carry through the full site
3. Title and number tracking stays at `−0.08em` — this is the single most important visual decision
4. Eyebrow → title → caption → hairline rule is the standard content hierarchy for every section
5. Buttons/links use the ghost pill style (`rounded-full`, `border festival-line`, translucent white bg, `−1px` hover lift)
6. Diamond / logo geometry is held until the logo arrives — do not invent placeholder geometry
7. `FestivalShell` is for standalone full-viewport pages only; the production homepage uses a regular `<main>`
8. All CMS content is fetched at build time — never client-side on initial load
9. Images must always use microCMS resize + WebP params
10. The 2D map experience must be complete before 3D is considered
