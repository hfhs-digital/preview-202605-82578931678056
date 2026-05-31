# Final Todo — HFHS 2026 Design Improvements

All items target `production-home-page.tsx` and its supporting components
unless a different file is specified. Items are ordered by priority.

---

## Already done ✓
- Hero character-stagger reveal (animejs)
- Hero eyebrow / meta / CTA fade-up
- Scroll-reveal for sections and card stagger
- Hero image carousel (cross-fade)
- Hero circle-arc corner ornaments (`HeroOrnament`)
- Notice bar → bottom on mobile, hidden on 404

---

## Color palette policy

**Keep the current coral (`#d9736a` / `rgba(217,115,106,…)`) and navy (`#20425f`)
as the emotional center of the palette.** Do not shift the site to wisteria-led
or cyan-led colors — those risk visual fragmentation with the existing tone.

Where wisteria or lavender was previously listed, replace with colors that
complement the coral-navy palette:
- Soft warm blush: `rgba(240,220,218,…)` (not cool-violet)
- Pale rose-mist: `rgba(245,228,224,…)`
- The existing navy `rgba(32,66,95,…)` and coral `rgba(217,115,106,…)` remain primary

---

## 1 — Title-side decorations with animation  *(explicitly requested · high)*

Recreate the Komaba "駒場祭とは" title decoration style (see reference image):
- **Top-left**: a long horizontal SVG line in navy `#20425f` with a small
  loop/knot drawn at the left end. Extends right, above and offset from the title.
- **Bottom-right**: a long horizontal SVG line in coral `#d9736a` with a small
  loop/knot at the right end. Below and to the right, partially overlapping the
  end of the title block.
- Both are SVG `<path>` elements, `stroke` only, `fill: none`, stroke-width ~1.5.
- New component: `src/components/title-deco/title-deco.tsx`.

**Animation — SVG stroke-dashoffset draw-in (animejs)**
- Each path gets `stroke-dasharray = totalLength`, `stroke-dashoffset = totalLength`.
- In `useVisibleTask$`, measure `path.getTotalLength()` and set initial dashoffset.
- Top-left line: animate `stroke-dashoffset → 0`, 600 ms, delay 820 ms.
- Bottom-right line: animate `stroke-dashoffset → 0`, 600 ms, delay 1060 ms.
- Respect `prefers-reduced-motion`: skip animation, show paths fully drawn.

**Placement**
- Absolutely positioned inside the `<div class="mt-8">` h1 wrapper,
  `pointer-events-none`, `overflow: visible`.
- Mobile (≤ 520 px): scale down to 70% or hide right-side deco.

---

## 2 — Reactivate `BokehLayer` with coral-harmonized palette  *(high)*

`BokehLayer` exists but is not mounted. Reactivate and re-color to match
the coral-navy palette (not cool-blue or wisteria).

**Color remapping** (`bokeh-layer.tsx` `CIRCLES[].bg`):
- `rgba(203,231,255,…)` → `rgba(240,220,218,…)` (very pale blush-rose)
- `rgba(228,241,255,…)` → `rgba(245,228,224,…)` (near-white warm blush)
- `rgba(214,234,255,…)` → `rgba(235,215,212,…)` (soft warm mist)
- `rgba(218,238,255,…)` → `rgba(242,222,219,…)` (pale blush)
- `rgba(235,245,255,…)` → `rgba(248,235,232,…)` (almost-white warm)
- Keep all alpha values the same.

**Mounting**
- Add `<BokehLayer />` inside `SitePage` (`site-page.tsx`) before `<Slot />`.

---

## 3 — Hero carousel: paper-flip 3-D turn motion  *(high)*

Replace the opacity cross-fade with a motion like flipping physical photos.

**Animation (per transition)**
- Outgoing: `rotateY [0deg → -12deg]` + `scaleX [1 → 0.96]` + `opacity [1 → 0]`,
  480 ms, `transform-origin: right center`, `perspective: 1200px`.
- Incoming: `rotateY [10deg → 0deg]` + `scaleX [0.96 → 1]` + `opacity [0 → 1]`,
  480 ms, delay 200 ms.
- Add `style="perspective: 1200px"` to the carousel wrapper `<div>`.
- `prefers-reduced-motion` fallback: revert to plain opacity cross-fade.

---

## 4 — Additional carousels: Highlights + Menu mobile  *(high)*

**Highlights section carousel**
- 6 items become a horizontal auto-carousel: show 3 on desktop, 2 on tablet,
  1 on mobile. Auto-advance every 4 s.
- Use `translateX` slide (simpler than per-item 3-D flip).
- Add prev/next arrow buttons (32×32 px circles, coral stroke).

**Menu section carousel (mobile only)**
- Below 640 px, wrap the 3 Menu cards in a single-row horizontal snap-scroll
  container with dot indicators.
- Above 640 px: static 3-column grid (no change).

---

## 5 — Highlights: remove photo placeholders + circular card design  *(high)*

Per the reference image (Komaba circle motif), move highlights to a round style.

**Remove**
- Delete the `<div class="flex aspect-4/3 …">` placeholder block from each card.

**New circular card design**
- Each card centers a circle (160 px diameter, `border-radius: 50%`).
- Circle border: 1.5 px stroke, coral `rgba(217,115,106,0.4)`.
  Background: `rgba(255,255,255,0.7)`.
- Inside: a large kanji or themed icon — 文, 踊, 食, 研, 際, 球 —
  `rgba(32,48,66,0.72)`, `font-size: 2.4rem`.
- Title (bold) + short description below the circle.
- Hover: circle border transitions coral → navy; card lifts `-2px`.
- Remove the rectangular card outer border; use only the circle as the focal shape.

---

## 6 — Hero eyebrow rule draw-in animation  *(medium)*

The thin `<span aria-hidden>` rule beside the eyebrow appears instantly.

- Class it `hero-eyebrow-rule`.
- In `useVisibleTask$`, imperatively `style.transform = 'scaleX(0)'`,
  `style.transformOrigin = 'left'`.
- Animate `scaleX [0 → 1]`, 500 ms, delay 80 ms.

---

## 7 — Scroll-down chevron indicator  *(medium)*

Animated scroll cue centered at the bottom of the hero section.

**Visual**: three `∨` chevrons (SVG), navy `rgba(32,48,66,0.25)`, 12×8 px,
7 px vertical gap.

**Animation**: CSS `@keyframes scroll-cue-{1,2,3}` — sequential opacity steps
over a 1.6 s infinite loop. Add to `global.css`. Whole group fades out via
`IntersectionObserver` when the hero exits the viewport.

---

## 8 — Section divider with animated ◇ pip  *(medium)*

**Component**: `src/components/section-divider/section-divider.tsx`
- Two half-lines in coral `rgba(217,115,106,0.22)` + centered `◇` pip
  in coral `rgba(217,115,106,0.5)`, `font-size: 0.45rem`.
- Half-lines: `scaleX [0 → 1]` on IntersectionObserver entry, 500 ms.
- Replace `border-t border-festival-line` on `<section data-reveal>` wrappers.

---

## 9 — Washi paper grain on the hero  *(low)*

CSS class `washi-grain` in `global.css` — SVG `feTurbulence` data-URI,
`opacity: 0.04`, `mix-blend-mode: multiply`. Apply to the hero `<section>`.

---

## 10 — `PageHeading` ornament on sub-pages  *(low)*

In `page-heading.tsx`, add `<HeroOrnament id="ph" …>` absolutely positioned
at the top-right of the heading block, `scale-50 opacity-55 pointer-events-none`.

---

## Summary table

| # | Item | File(s) | Priority |
|---|------|---------|----------|
| 1 | Title deco lines + loop knots (SVG draw-in) | new `title-deco.tsx`, `production-home-page.tsx` | **High** |
| 2 | BokehLayer → reactivate + blush-coral palette | `bokeh-layer.tsx`, `site-page.tsx` | **High** |
| 3 | Carousel → paper-flip 3-D turn motion | `production-home-page.tsx` | **High** |
| 4 | Additional carousels (Highlights + Menu mobile) | `production-home-page.tsx` | **High** |
| 5 | Highlights → remove placeholders + circular cards | `production-home-page.tsx` | **High** |
| 6 | Eyebrow rule draw-in | `production-home-page.tsx` | Medium |
| 7 | Scroll-down chevron cue | `production-home-page.tsx`, `global.css` | Medium |
| 8 | Section divider with ◇ pip | new `section-divider.tsx`, `production-home-page.tsx` | Medium |
| 9 | Washi grain texture | `production-home-page.tsx`, `global.css` | Low |
| 10 | PageHeading ornament on sub-pages | `page-heading.tsx` | Low |
