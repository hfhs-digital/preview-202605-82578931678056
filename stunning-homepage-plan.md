# Stunning Homepage Plan

## Goal

Build a homepage and surrounding site for **HFHS School Festival 2026** that feels as striking and polished as high-end brand sites like **SAKURA DEEPTECH SHIBUYA**, while staying practical for a school festival:

- beautiful on first view
- fast under weak Wi-Fi and crowd traffic
- mobile-first
- maintainable by the committee after handoff
- content-driven through **microCMS**

This is not just a visual exercise. The site must be robust enough to act like a digital festival pamphlet on crowded campus networks.

---

## Confirmed project direction

Based on the current repository, executive requests, the design sketch, and the Gemini discussion, the direction is:

- **Framework:** Qwik + Qwik City
- **Build/runtime:** Vite (with Bun or npm workflow as needed)
- **Styling:** Tailwind CSS
- **UI primitives:** Qwik UI or a very small Qwik-friendly custom primitive layer
- **Animation:** Anime.js, preferably leaning on **WAAPI-style usage** where possible
- **CMS:** microCMS
- **Data fetching:** standard `fetch()` only, **no microCMS SDK**
- **Delivery strategy:** static-first / SSG-oriented architecture

The big principle is: **premium look, low runtime cost**.

---

## Executive requirements that must shape the plan

The homepage cannot be designed in isolation. The surrounding site requirements are already defined.

### Required operational constraints

- A **Coming Soon** page must be available before full launch.
- The site will be **operated by the digital committee**, so the final structure must be understandable and update-friendly.
- The content is based on last year's site, but the information architecture needs to be designed from scratch here.

### Required microCMS usage

The site needs to use microCMS for these content models:

1. **News** (`/news/*`)
   - homepage shows **3 items only**
   - dedicated `/news/` listing page
   - dedicated `/news/<id>` detail page

2. **Pages** (`/pages/`)
   - homepage may be hand-coded
   - non-home pages should be CMS-driven wherever possible
   - route shape should allow CMS-managed pages like `/<page-id>`

3. **Important news**
   - a single-content endpoint
   - behaves like a persistent high-priority notice
   - displayed only when present
   - should link into a news detail page

### Allowed exceptions

If a page needs bespoke interaction or layout that CMS content cannot reasonably express, it is acceptable to build it directly in code. The campus map is the clearest example.

---

## Core architectural decision

### microCMS is just a JSON API

The implementation should treat microCMS as a content API, not as a rendering platform.

That means:

- fetch content in Qwik with **plain `fetch()`**
- keep secrets out of the client
- avoid the SDK because it adds little value for this project
- prefer **server-side / build-time fetching**

### Preferred rendering model

For this project, the best default is:

- **Qwik City routeLoader$**
- content fetched at build time where possible
- pages emitted statically

Why this matters:

- less runtime data fetching on user devices
- less chance of blank states under poor connectivity
- better performance on older phones
- easier caching and static hosting

In practice, the ideal flow is:

`microCMS -> build -> static HTML/CSS/JS -> user`

Not:

`user -> client JS -> fetch content -> wait on unstable Wi-Fi`

---

## Hosting and reliability strategy

The Gemini discussion strongly supports a **static-first** deployment model.

### Recommended reliability posture

- **SSG-first**
- **GitHub Pages-compatible static output**
- **PWA caching** if we adopt it
- aggressive image optimization
- minimal client JS on initial load

This matches the project's real constraint: large crowds and weak school Wi-Fi.

### Implications for implementation

- Add Qwik's **static adapter** when the deployment path is finalized.
- If hosting on GitHub Pages or any static host, ensure path handling and asset base settings are correct.
- If GitHub Pages is used, `.nojekyll` should be part of the static output strategy.
- microCMS updates should ideally trigger rebuilds through **webhook -> GitHub Actions -> redeploy**.

Even if the final public domain is custom, a static-hosting-compatible architecture is still the right foundation.

---

## Design direction

This section describes the actual, realized design language that already exists in the coming soon page, and extends it as a precise specification for every screen that comes after it. The coming soon page is the design north star — not an approximation. Every future page must feel like it was drawn from the same hand.

---

### What makes this design stunning

The coming soon page achieves its impact through extreme restraint. There is almost nothing on screen, yet it feels premium and alive. The effect comes from four things working in concert:

1. **Atmospheric background** — a layered radial gradient that puts soft pools of icy light in different corners of the page, giving the canvas depth without any decorative graphics.
2. **Deep navy on icy white** — the text palette is navy rather than black, which softens the contrast while keeping it crisp. There is no color accent anywhere. The only "color" is the tonal range from muted blue-grey to deep navy.
3. **Tight negative tracking on the title** — the hero headline has `letter-spacing: -0.08em`, which is very aggressive. At large fluid sizes (`clamp(2.7rem, 7.6vw, 5.8rem)`) this creates the kind of compressed, editorial weight that reads as intentional craft.
4. **A live animation that does not shout** — the countdown tick is a blur-to-sharp fade with a spring-like easing. Each number appears as if it snaps into focus, not as if it scrolls or slides. This subtlety is the difference between decorative animation and integrated animation.

Reproduce all four together. If any one of them is diluted, the whole page will feel ordinary.

---

### Emotional tone

- editorial and composed, not playful
- icy light, not warm light
- premium without being cold — the soft navy hue keeps it approachable
- the energy is latent: the page is quiet, but the countdown is moving, and that motion carries the anticipation

If someone describes the page as "calm but exciting," that is exactly right.

---

### Visual system: what is actually used

The coming soon page does **not** use diamond geometry or any graphic motif from the logo sketch. It does not need to, because the logo does not exist yet.

The current visual system is purely:

- **atmosphere** (layered gradients and blur orbs)
- **typography** (weight, tracking, size contrast between layers)
- **hairline rules** (a single 1px border that separates the countdown from the hero text)
- **spacing rhythm** using `clamp()` throughout

This is intentionally sparse. When the logo arrives, its geometry can be woven in as an additional layer of identity — not as a replacement for what already works. The design must remain beautiful even before the logo exists.

---

### Background system — exact recipe

The page background is defined at the `html, body` level in `global.css`. It is a `background` shorthand stacking multiple layers (last listed = bottom):

```
linear-gradient(180deg, #fbfdff 0%, #f1f8ff 48%, #f7fbff 100%)
  ← vertical gradient: near-white at top, faint blue tint in mid, near-white at bottom

radial-gradient(circle at 50% 100%, rgba(225,241,255,0.82), transparent 36%)
  ← soft glow pooling at the very bottom center

radial-gradient(circle at 88% 16%, rgba(213,236,255,0.88), transparent 24%)
  ← soft glow in upper-right area

radial-gradient(circle at 12% 22%, rgba(255,255,255,0.92), transparent 30%)
  ← near-white highlight in upper-left area
```

The result is a canvas that is not flat white. There are subtle light sources in different quadrants. This is what makes the page feel atmospheric without any image assets.

Do not simplify this to a flat `#f7fbff`. The depth disappears immediately.

---

### Glow orb system — exact specification

On top of the CSS background, the `FestivalShell` component renders two absolutely-positioned orbs. These add a second layer of localized atmospheric light on top of the already-layered background.

**Orb one — lower left:**

```
position: absolute
bottom: 10%
left: -6%
width: 380px (300px at ≤900px, 220px at ≤420px)
height: same as width
border-radius: 50%
background: rgba(203, 231, 255, 0.85)
filter: blur(32px)
pointer-events: none
```

This orb sits partially outside the left edge of the viewport. The blue is slightly warmer than the upper orb.

**Orb two — upper right:**

```
position: absolute
top: 2%
right: -10%
width: 480px (360px at ≤900px, 280px at ≤420px)
height: same as width
border-radius: 50%
background: rgba(228, 241, 255, 0.90)
filter: blur(32px)
pointer-events: none
```

This orb sits partially outside the right edge. It is larger and slightly cooler/lighter than the lower orb.

The `isolation: isolate` on the `<main>` container prevents the blur from leaking outside the page shell in any browser that uses stacking-context compositing for blur.

**The combined effect:**  
The background provides gentle global depth. The two orbs provide strong local depth — a warm light source in the lower left, a cool lighter source in the upper right. The content sits between them, benefiting from both without either competing with the text.

Do not change the orb colors to be more saturated. The existing values sit at the boundary of perceptibility — visible but not distracting.

---

### Color token system — actual values

These are defined in `global.css` under `@theme` and used as Tailwind tokens throughout the codebase:

| Token | Hex / Value | Use |
|---|---|---|
| `festival-navy` | `#14304f` | title text, countdown numbers, links |
| `festival-navy-soft` | `#2b5277` | eyebrow labels, caption text |
| `festival-text` | `#17314f` | body text (very close to navy) |
| `festival-muted` | `#5c7694` | secondary content, countdown labels, message text |
| `festival-line` | `rgba(20, 48, 79, 0.14)` | hairline borders and dividers |

The entire site uses only these five stops. There is no accent color, no bright hue, no warm tone. Every color in the UI is a shade of deep navy desaturating toward a cool blue-grey.

This is the discipline that makes the design feel premium. Adding a bright accent color will immediately cheapen it. The only visual "pop" is the contrast between the deep navy title and the near-white background.

When the logo color arrives, add it to `@theme` as a named token and use it only where the logo directly prescribes it.

---

### Typography system — exact values

**Typeface**

```
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif
```

No display fonts, no Japanese web fonts yet. The Japanese text (`東福岡学園祭 2026`) renders in the system's default Gothic sans, which is fine. If a Japanese font is added later, it must be a clean Gothic sans — not a Mincho/serif.

**Hero title (h1)**

```
font-size: clamp(2.7rem, 7.6vw, 5.8rem)
font-weight: 600
line-height: 0.94
letter-spacing: -0.08em
color: festival-navy
```

At ≤680px: `clamp(2.5rem, 11vw, 4rem)`  
At ≤420px: `clamp(2.15rem, 12vw, 3.2rem)`

The `line-height: 0.94` is tighter than 1. At large display sizes this is intentional — the title should feel like a solid block, not loose type. The `-0.08em` tracking is the most critical number in the entire design. Do not reduce it. At the maximum size of 5.8rem this compresses the characters significantly and is what gives the headline its editorial weight.

**Eyebrow (event name label above the title)**

```
font-size: 0.72rem
font-weight: 400 (default)
letter-spacing: 0.16em
text-transform: uppercase
color: festival-navy-soft
margin-bottom: 14px (3.5 Tailwind units)
```

At ≤420px: `font-size: 0.66rem`, `letter-spacing: 0.12em`

The eyebrow must read as subordinate to the title. It works by being very small and spaced wide — the opposite of the title's tight tracking.

**Caption row (status + separator + date)**

```
display: inline-flex (flex-wrap: wrap)
align-items: center
gap: 10px
margin-top: 16px
font-size: 0.72rem
letter-spacing: 0.16em
text-transform: uppercase
color: festival-navy-soft
```

At ≤680px: switches from `inline-flex` to `grid` with `gap: 6px`, and the hairline separator is hidden.

The hairline separator between "Coming Soon" and the date is:

```
width: 18px
height: 1px
background: rgba(20, 48, 79, 0.22)
```

This is not a decorative element — it creates a visual pause between the status word and the date, making the caption scannable without needing punctuation or larger spacing.

The date inside the caption is `font-weight: 600` to distinguish it from the plain-weight "Coming Soon" text. This is the only weight contrast in the caption row.

**Countdown numbers**

```
font-size: clamp(2.2rem, 5.4vw, 4.2rem)
font-weight: 600
line-height: 1
letter-spacing: -0.08em
color: festival-navy
```

At ≤680px: `clamp(2rem, 11vw, 3.2rem)`

The tracking is the same −0.08em as the hero title. This creates a visual echo — the countdown is understood as part of the same typographic family as the title, not as a secondary UI element.

**Countdown labels (Days / Hours / Minutes / Seconds)**

```
font-size: 0.62rem
letter-spacing: 0.16em
text-transform: uppercase
color: festival-muted
```

At ≤420px: `font-size: 0.58rem`, `letter-spacing: 0.12em`

Very small, very widely tracked. The labels are deliberately minimal — the numbers do the talking.

---

### Layout system — the `FestivalShell`

The `FestivalShell` component provides the shared page container for all full-viewport pages. This includes the coming soon page, the 404 page, and any standalone page that needs the atmospheric shell.

**Outer `<main>` (page root):**

```
position: relative
isolation: isolate
display: flex
align-items: center (center on desktop, start on ≤680px)
justify-content: center
min-height: 100vh
overflow: hidden
padding: clamp(24px, 5vw, 56px)
```

Breakpoint overrides:
- `≤900px`: `padding: 28px 28px 40px 28px`
- `≤680px`: `align-items: start`, `padding: 64px 22px 32px 22px`
- `≤420px`: `padding: 56px 18px 28px 18px`

At ≤680px, the layout switches from centered to top-aligned. This is the most important responsive behavior on the page. On mobile, the title should read from the top of the visible area, not appear cut off in the center.

**Inner `<section>` (content container):**

```
position: relative
width: 100%
padding: clamp(18px, 3vw, 28px) 0  (top and bottom padding only)
```

Standard page: `max-width: 1000px` (≤900px: 680px)  
Narrow page (404, etc): `max-width: 800px` (≤900px: 520px)

The `position: relative` on the section ensures content stacks above the absolutely-positioned blur orbs, which are on the outer `<main>`.

---

### Countdown layout — exact grid specification

The countdown sits below the hero text, separated by a top border.

```
display: grid
grid-template-columns: repeat(4, minmax(0, 1fr))
width: min(620px, 100%)
gap: clamp(14px, 2vw, 22px)
margin-top: clamp(24px, 4vw, 36px)
padding-top: 18px
border-top: 1px solid festival-line
```

Breakpoints:
- `≤680px`: `grid-template-columns: repeat(2, 1fr)`, `max-width: 360px`, `gap: 16px 14px`, `margin-top: 22px`, `padding-top: 16px`
- `≤420px`: `max-width: 100%`, `gap: 14px 12px`

Each countdown item is a two-row grid: number frame on top, label below, with a 6px gap. The number frame (`min-h-[1em]`, `overflow-hidden`) exists to clip the blur animation — without it, the outgoing blur state of the animation would spill outside the number's bounding box and look sloppy.

---

### Animation system — the countdown tick

The only animation in the current design is the countdown tick. It is CSS `@keyframes`, registered in `global.css` and exposed as a Tailwind utility via `@theme`:

```css
@keyframes countdown-tick {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}
```

Duration: `520ms`  
Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — this is a spring-like ease-out. It decelerates aggressively at the end, which makes the number feel like it "snaps" into clarity rather than fading in gradually.

The animation triggers because Qwik changes the element `key` when the value changes. The new element enters with the animation applied from the start. This is the correct Qwik pattern — no JS-driven animation controller needed for this effect.

Every animation added to future pages should follow the same philosophy: start from an imperceptible or hidden state, arrive at a natural resting state, use an ease-out curve, and complete in under 600ms. Never animate a prop that would require measuring layout at runtime unless absolutely necessary.

---

### Logo placeholder strategy

The logo does not exist yet. The current coming soon page has no logo because the plan specifically permits this. When the logo arrives:

1. Add it to `public/` as an SVG (preferred) or as `src/assets/` if it needs to be inlined or processed.
2. Import it and place it above the eyebrow text in the coming soon page.
3. Assign a fixed display height using `clamp()` — likely `clamp(40px, 6vw, 64px)`.
4. Use the `festival-navy` fill or `currentColor` if the SVG is monochromatic.
5. Add `margin-bottom` between the logo and the eyebrow to maintain the rhythm.

If the logo contains diamond geometry, that geometry can be extracted as a standalone SVG path and reused as a decorative element elsewhere (section dividers, hover indicators, etc.). This is when the diamond motif from the original plan becomes relevant — not before.

Do not placeholder the logo with a text string, colored box, or any other element that would then need to be removed. Simply omit it until the real asset exists.

---

### How the full homepage extends this system

The coming soon page establishes the visual DNA. The full homepage must feel like an evolution of the same design, not a redesign.

Principles for the full homepage:

- **The background system transfers directly.** The same layered radial gradient and glow orbs should underpin the hero section. Below the fold, sections may be differentiated by subtle surface changes (slightly off-white panels, light border lines) but should never introduce new colors.
- **The eyebrow → title → caption hierarchy is the core content pattern.** Every section with a heading should use a variant of this pattern: small uppercase label, large display heading, secondary detail line.
- **The hairline border is the primary structural element.** Section separators should be a single 1px line in `festival-line`. No thick rules, no gradient separators, no decorative borders.
- **The countdown grid becomes the data pattern.** Any numeric display (event statistics, schedule time slots, seat counts) should echo the countdown's type treatment: large navy number, small tracked label below.
- **Buttons and links use the ghost pill style already established in the 404 page.** `border: 1px solid festival-line`, `background: rgba(255,255,255,0.55)`, `border-radius: 999px`, with a `-1px translateY` hover lift and a `160ms ease` transition. This is already the design system for interactive elements.
- **The `FestivalShell` is only for full-viewport standalone pages.** For the multi-section homepage, the outer shell is a regular `<main>` with the same radial gradient background already inherited from `body`. The glow orbs live only in the hero section of the homepage, not across the entire page.

---

## Homepage content structure

The homepage should be a sequence of visually distinct, highly controlled sections.

### 1. Persistent important-news bar

This should sit in a highly visible fixed or near-fixed position, probably in the upper-left area or as a top notice band depending on the final header design.

Rules:

- show only when microCMS important-news content exists
- use a visible announcement cue such as `📣`
- link to the related news detail page
- keep it compact and always recognizable

### 2. Hero

The hero should immediately communicate:

- event name
- year
- dates
- location
- core theme or catchphrase

Recommended visual approach:

- full-height layout using `FestivalShell` or equivalent atmospheric shell
- layered radial gradient background carried from the coming soon page
- same glow orbs (lower-left warm, upper-right cool) for atmospheric depth
- eyebrow → large display title → caption row hierarchy, same as coming soon page
- strong CTA cluster below the title area
- if the logo exists, it leads above the eyebrow
- if diamond geometry exists in the logo, it can be echoed in framing or hover details here

### 3. News preview

This is a required CMS-backed block.

Rules:

- show **3 latest items only**
- designed as editorial cards, not a plain list
- link to `/news/`
- allow category/date emphasis

### 4. Theme / About

This should explain the concept of the festival in a more art-directed way:

- big statement copy
- image or motif support
- highlighted phrases
- geometric composition

### 5. Highlights / Attractions

Good candidates:

- stage events
- exhibits
- food
- club activity
- special experiences

This can be partially CMS-backed later, but should first be designed as a flexible showcase section.

### 6. Schedule teaser

Even if the full schedule becomes its own page or structured CMS content, the homepage should preview it with a strong, readable summary.

### 7. Map / access teaser

This should lead into the practical navigation experience.

### 8. Closing CTA / footer

Should feel conclusive and branded, not like a default footer dump.

---

## Non-home page strategy

This part needs to reflect the executive request more directly than the previous draft did.

### CMS-driven pages

Pages other than the homepage should default to microCMS-driven content via a dynamic page route.

Examples:

- greeting
- visitor notes
- access
- generic information pages

### Code-driven pages

Pages may be implemented directly in code when they need stronger interaction or richer layout than a CMS body can express.

Examples:

- map
- advanced schedule UI
- special exhibit directory
- optional 3D experience page

The key rule is:

- **CMS for editable content**
- **code for experiential or highly interactive content**

---

## Coming Soon page

**Status: complete.** The coming soon page is live in `src/features/home/pages/coming-soon-home-page.tsx` and is the current active homepage. It is activated by setting `HOME_PAGE_VARIANT = 'coming-soon'` in `src/features/home/config.ts`.

### What was actually built

The coming soon page contains exactly:

- Eyebrow: `HFHS SCHOOL FESTIVAL 2026` (0.72rem uppercase, wide tracking, navy-soft)
- Title: `東福岡学園祭 2026` (fluid 2.7–5.8rem, −0.08em tracking, font-semibold, navy)
- Caption row: `Coming Soon` + hairline separator + `Jun 12–13, 2026` (same scale as eyebrow, date is bold)
- Live countdown: 4-column grid (2-column on mobile) with blur-snap tick animation

No logo is present yet. No CTA button. No location line. No teaser copy. The page is complete as-is without these — adding them prematurely would undermine the restraint that makes it work.

### What to add when available

**Logo:** Place it above the eyebrow once the asset exists. Use `clamp(40px, 6vw, 64px)` for height. See the logo placeholder strategy in the design direction section above.

**No other additions are needed** for the coming soon page. The countdown is the call to action. The date is the CTA. Resist the urge to add social links, email signup, or decorative elements.

### Switching to production

Change one line in `src/features/home/config.ts`:

```ts
export const HOME_PAGE_VARIANT: HomePageVariant = 'production'
```

Then implement the real homepage content in `src/features/home/pages/production-home-page.tsx`. The coming soon page component is preserved and remains importable.

---

## Animation strategy

The previous plan mentioned Anime.js generally; now the direction is clearer.

### Preferred animation philosophy

- use Anime.js where it genuinely improves art direction
- lean toward **WAAPI-friendly** usage patterns where possible
- start animation only when needed
- keep initial JS cost low

### Best use cases

- hero intro choreography
- section reveal transitions
- line drawing / frame reveal
- hover motion
- staggered text or card entrances
- subtle emphasis around the diamond motif

### Qwik-specific rule

Interactive animation logic should be loaded as late as possible, typically through:

- `useVisibleTask$`
- dynamic import when appropriate

That keeps the initial page lightweight.

---

## 3D map direction

Gemini discussion introduced an optional 3D map path, and it fits the exception policy from the executive request.

### Recommendation

Treat the 3D map as **optional progressive enhancement**, not as the default experience.

### Default map strategy

- lightweight 2D map first
- fast and readable on any device
- no heavy runtime dependency required to understand campus layout

### Optional 3D strategy

If implemented:

- load only after explicit user interaction or clear visibility trigger
- dynamically import Three.js
- use compressed models
- keep frame rate and rendering cost conservative

The 3D map should never block access to the practical map.

---

## microCMS implementation plan

We should formalize the content model expectations in the brief.

### Required content models

#### News

- title
- publish date
- category if available
- thumbnail if available
- body
- id

Used for:

- homepage preview
- `/news/` list
- `/news/<id>` detail

#### Pages

- title
- slug/id
- body
- optional metadata for SEO / hero / summary

Used for:

- dynamic CMS-managed pages outside the homepage

#### Important news

- title
- linked news entry
- visibility controlled by whether content exists

Used for:

- persistent announcement UI

### Fetch policy

- use `fetch()`
- load data in `routeLoader$`
- keep API keys server-only
- never rely on browser-side authenticated fetch for the main site content

### Image policy

Use microCMS image transformation parameters aggressively:

- resize
- modern format conversion
- responsive dimensions

Poor Wi-Fi means oversized images are a real product risk.

---

## Suggested Qwik structure

```text
src/
  components/
    ui/
      button/
      badge/
      section-heading/
      container/
      drawer/
      notice-bar/
    homepage/
      hero/
      news-preview/
      about/
      highlights/
      schedule-preview/
      map-preview/
      closing-cta/
    map/
      map-2d/
      map-3d/
  routes/
    index.tsx
    coming-soon/
    news/
      index.tsx
      [id]/
        index.tsx
    [...slug]/
      index.tsx
```

The dynamic page route may need naming adjustments based on the chosen Qwik routing strategy, but the intent is clear: homepage in code, news routes in code, generic pages through CMS-backed routing.

---

## Tailwind strategy

Tailwind should be used as a system, not just a utility pile.

### Define early

- color tokens for pale cyan / dark navy / surface states
- font families
- spacing rhythm
- border and radius rules
- glow / line / overlay tokens
- container widths
- motion-safe helper classes

### Reusable visual patterns

- `section-shell`
- `section-kicker`
- `display-heading`
- `diamond-frame`
- `notice-bar`
- `hero-grid`
- `cta-primary`
- `cta-secondary`
- `dark-panel`

The identity should emerge from **repetition of strong patterns**, not one-off styling.

---

## Build phases

### Phase 1: launchable foundation

- install Tailwind CSS
- install Anime.js
- decide the Qwik UI scope
- prepare static-friendly deployment direction

### Phase 2: CMS foundation

- create fetch helpers for microCMS with plain `fetch`
- define server-only environment variable handling
- wire `routeLoader$`
- implement news list/detail and important-news loading

### Phase 3: homepage visual system

- establish color and typography tokens
- build header, important-news bar, hero, and section heading system
- implement the pale-cyan / diamond design language

### Phase 4: homepage content blocks

- news preview
- about/theme
- highlights
- schedule teaser
- map teaser

### Phase 5: CMS-driven pages

- dynamic page route for microCMS pages
- shared CMS page renderer
- page-level SEO and metadata handling

### Phase 6: motion and polish

- WAAPI-leaning Anime.js enhancements
- reveal choreography
- hover details
- loading and transition polish only where justified

### Phase 7: advanced extras

- optional PWA
- optional 3D map
- optional richer CMS models for exhibits or schedule

---

## Installation direction

The earlier plan was incomplete here. The installation direction should now be:

- install **Tailwind CSS**
- install **Anime.js**
- add any required Qwik-compatible UI primitives
- **do not install the microCMS SDK**

Reason:

- the SDK is unnecessary here
- plain `fetch()` is enough
- smaller dependency surface is better for this project

---

## Final design rules

1. **Use geometry from the logo, not random decoration**
2. **Keep the pale-cyan palette disciplined**
3. **Make the homepage feel premium before making it complex**
4. **Fetch CMS data server-side or at build time**
5. **Do not make users wait for client-side content loading**
6. **Always design for weak Wi-Fi first**
7. **The 2D experience must stand on its own, even if 3D is added**
8. **The committee must be able to operate the content after handoff**

---

## Recommended immediate next target

Implement in this order:

1. Coming Soon page
2. Tailwind theme tokens
3. microCMS fetch layer with plain `fetch()`
4. homepage hero and important-news bar
5. homepage news preview
6. `/news/` list and detail pages
7. CMS-driven generic pages

That sequence matches both the executive requirements and the actual technical strategy that came out of the Gemini discussion.
