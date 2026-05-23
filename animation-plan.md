# Animation Plan — HFHS School Festival 2026

Stack: **Anime.js v4 (WAAPI mode)** · Qwik `useVisibleTask$` for client-side lifecycle  
Design language: light navy-blue, translucent glass panels, soft-focus light diffusion

> **Implemented:** Ideas 1, 2, 3, 6, 9

---

## 1 · Fixed Parallax Glass Bokeh  ⭐ ✅ IMPLEMENTED

**Concept**  
A layer of 10 large, heavily-blurred, semi-transparent circles (`position: fixed`, `pointer-events: none`, `z-index: 0`) drifts slowly behind all page content — like soft, out-of-focus light sources seen through frosted glass. Each circle uses the site palette (`rgba(203,231,255,…)`, `rgba(228,241,255,…)`) with heavy blur (24–56 px) so they read as pure diffused light, not shapes.

The page content (`z-index: 1` wrapper) sits above this layer. Cards with `backdrop-filter: blur(4px)` and white translucent fills appear to float through the bokeh, creating depth.

**Motion**  
- 10 circles, radii 50–130 px, scattered pseudo-randomly across the viewport.
- Each circle fades in over 2.2 s with a staggered delay, then enters an infinite alternate drift (±12–22 px, 9.5–17 s) with a subtle scale pulse (0.94–1.03).
- `prefers-reduced-motion` is respected — all Anime.js calls are skipped.

**Files:** `src/components/bokeh-layer/bokeh-layer.tsx`, `src/components/site-page/site-page.tsx`

---

## 2 · Hero Title Character Stagger Reveal  ✅ IMPLEMENTED

**Concept**  
On initial load, each character of `東福岡学園祭 2026` enters from `opacity: 0, translateY: 0.18em` to fully visible — a cascading character-by-character reveal, evoking text resolving through glass.

**Motion**  
- `useVisibleTask$` replaces the h1 text with individual `<span class="hero-char">` elements.  
- Anime.js WAAPI stagger: `duration: 620, delay: stagger(42, { start: 280 })`.
- Eyebrow line fades up 120 ms before the title chars start.
- Meta row (date/location) fades up at 760 ms.
- CTA button scales in from 0.96 at 980 ms.

**Files:** `src/features/home/pages/production-home-page.tsx`

---

## 3 · Scroll-Triggered Section Fade-Up  ✅ IMPLEMENTED

**Concept**  
Each `<section>` below the hero slides up 22 px and fades from `opacity: 0` as it enters the viewport. Grid children (visitor-guide cards, highlight cards, schedule items) arrive sequentially with a 55 ms stagger.

**Motion**  
- `IntersectionObserver` (threshold 0.08) fires once per section.
- Section: `translateY: 22px → 0, opacity: 0 → 1, duration: 580`.
- Cards: `translateY: 14px → 0, opacity: 0 → 1, delay: stagger(55, { start: 60 })`.
- `data-reveal` on sections, `data-reveal-card` on card elements.

**Files:** `src/features/home/pages/production-home-page.tsx`

---

## 4 · Card Hover Glass Shimmer  (not raindrop — pure surface sheen)

**Concept**  
When hovering a visitor-guide or highlights card, a soft white gradient shimmer sweeps across the card surface left-to-right — like light reflecting off glass at an angle. The shimmer is a `<span>` with `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` that Anime.js translates from `x: -100%` to `x: 100%` over 500 ms.

**Motion**  
- `mouseenter` triggers the sweep: `translateX: ['-100%', '100%'], duration: 480, ease: 'inOutSine'`.
- Simultaneously: card `box-shadow` deepens via CSS transition (not Anime.js).

---

## 5 · Countdown Digit Vertical Slide

**Concept**  
Each countdown digit changes with a smooth vertical slide — outgoing slides up and fades, incoming slides up from below and materialises. Clean and mechanical.

**Motion**  
- Outgoing `<span>`: `translateY: [0, '-1em'], opacity: [1, 0], duration: 220`.
- Incoming `<span>`: `translateY: ['1em', 0], opacity: [0, 1], duration: 280, delay: 80`.
- Slots neatly into the existing `useVisibleTask$` tick loop.

---

## 6 · Floating Background Orb Breathing  ✅ IMPLEMENTED

**Concept**  
The two large warm-blue glow blobs in the production hero (`rgba(203,231,255,0.85)` and `rgba(228,241,255,0.9)`) are given a slow alternate drift + scale — the same soft breathing as the bokeh layer, creating multi-depth parallax.

**Motion**  
- Left orb: `translateX 0→20, translateY 0→16, scale 1→1.06, duration: 9000`.
- Right orb: `translateX 0→-16, translateY 0→20, scale 1→1.08, duration: 11000, delay: 1500`.
- Both loop with `alternate: true, ease: 'inOutSine'`.

**Files:** `src/features/home/pages/production-home-page.tsx`

---

## 7 · Page Transition — Blur Veil

**Concept**  
When navigating between pages, the outgoing content blurs and fades out (160 ms), the incoming content blurs in and resolves (350 ms) — matching gogatsusai.jp's `page-enter-active` style, implemented with Anime.js for programmable choreography.

**Implementation notes (Qwik City)**  
- Use `useNavigating$` signal to detect navigation start/complete.
- `onLeave`: `filter: ['blur(0)', 'blur(6px)'], opacity: [1, 0], duration: 160`.
- `onEnter`: `filter: ['blur(6px)', 'blur(0)'], opacity: [0, 1], duration: 350`.

---

## 8 · News List Item Line-Draw Reveal

**Concept**  
The divider `<hr>` / border above each news list item "draws" from left to right as the list enters the viewport, then the date and title fade in 80 ms later.

**Motion**  
- Border `scaleX: [0, 1], transformOrigin: 'left center', duration: 380, ease: 'easeOutQuart'`.
- Date + title: `opacity: [0, 1], translateX: ['-6px', '0'], delay: 80, duration: 320`.

---

## 9 · Scroll Progress Indicator  ✅ IMPLEMENTED

**Concept**  
A 2 px translucent navy line at the very top of the viewport (`position: fixed`) fills left to right as the user scrolls — subtle, glassy, professional.

**Motion**  
- Pure JS: passive `scroll` listener updates `element.style.transform = scaleX(ratio)`.
- No Anime.js; uses CSS `transform-origin: left center`.

**Files:** `src/components/site-page/site-page.tsx`, `src/global.css`

---

## 10 · Header Logo Entrance

**Concept**  
On first render the header logo resolves from slightly blurred and small (`scale(0.9), blur(10px), opacity(0)`) to sharp — a single defocused point crystallising.

**Motion**  
```
animate('.site-header .logo', {
  scale: [0.9, 1],
  opacity: [0, 1],
  duration: 700, delay: 80,
  ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
})
```

---

## Implementation Priority

| # | Idea | Status | Visual Impact |
|---|------|--------|---------------|
| 1 | Fixed glass bokeh | ✅ Done | ⭐⭐⭐⭐⭐ |
| 2 | Hero title stagger | ✅ Done | ⭐⭐⭐⭐⭐ |
| 3 | Section fade-up | ✅ Done | ⭐⭐⭐⭐ |
| 6 | Orb breathing | ✅ Done | ⭐⭐⭐⭐ |
| 9 | Scroll progress bar | ✅ Done | ⭐⭐ |
| 4 | Card glass shimmer | Pending | ⭐⭐⭐⭐ |
| 7 | Page blur transition | Pending | ⭐⭐⭐⭐ |
| 5 | Countdown digit slide | Pending | ⭐⭐⭐ |
| 8 | News line-draw | Pending | ⭐⭐⭐ |
| 10 | Header logo entrance | Pending | ⭐⭐⭐ |


Stack: **Anime.js v4 (WAAPI mode)** · Qwik `useVisibleTask$` for client-side lifecycle  
Design language: light navy-blue, translucent glass panels, rainy-day aesthetic

---

## 1 · Fixed Parallax Rain-Glass Bokeh  ⭐ (primary recommendation)

**Concept**  
A layer of large, soft, semi-transparent circles (`position: fixed`, `pointer-events: none`,
`z-index: 0`) drifts slowly behind all page content as the user scrolls — like watching the
world through rain-spotted glass. Each "droplet" is a blurred circle in the site's palette
(`rgba(203,231,255,…)`, `rgba(228,241,255,…)`, `rgba(255,255,255,…)`) with a subtle inner
highlight arc that gives it a convex lens feel. Grid cards and typography sit above this layer
with `backdrop-filter: blur(4px)` and a soft white translucent fill, so they appear to "emerge
through" the glass surface.

**Motion**  
- 8–14 circles, radii 40–180 px, scattered pseudo-randomly across the viewport.
- Each circle gets its own Anime.js WAAPI loop: slow drift (±20–40 px, 6–14 s) and a gentle
  scale pulse (0.92 → 1.08, 8–18 s), all with `easing: 'easeInOutSine'` and staggered delays.
- On `scroll`, a `transform: translateY(scrollY * parallaxFactor)` is applied per-circle via
  a lightweight rAF loop (not Anime.js — avoids re-triggering WAAPI), with different factors
  (0.05–0.25) so layers separate like real glass depth.

**Implementation notes (Qwik)**  
- Render circles from a `useVisibleTask$` that inserts a `<canvas>` or absolute-positioned
  `<div>` layer into `document.body`.
- Cleanup on component unmount removes the fixed layer.
- Respects `prefers-reduced-motion`: collapses all durations to 0 ms.

---

## 2 · Hero Title Character Stagger Blur-Reveal

**Concept**  
On initial load, each character of `東福岡学園祭 2026` enters from `opacity: 0, blur(12px)`
to `opacity: 1, blur(0)` with a cascading WAAPI stagger, evoking condensation clearing from
glass — matching the gogatsusai.jp page-enter transition style.

**Motion**  
```
anime({
  targets: '.hero-title .char',
  opacity: [0, 1],
  filter: ['blur(12px)', 'blur(0px)'],
  duration: 700,
  delay: anime.stagger(40, { start: 200 }),
  easing: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
})
```
- Eyebrow line (`HFHS SCHOOL FESTIVAL 2026`) fades in 80 ms before the title.
- Sub-caption (date/location row) fades up (`translateY: [8px, 0]`) 120 ms after the last char.
- CTA button scales in from `scale(0.94)` last.

**Implementation notes**  
- Split Japanese text into individual `<span class="char">` wrappers via a helper function
  called in `useVisibleTask$`.
- Entire sequence plays only once on mount; no loop.

---

## 3 · Scroll-Triggered Section Fade-Up

**Concept**  
Each `<section>` below the hero slides up 24 px and fades from `opacity: 0` to `1` as it
enters the viewport. Stagger within grid children (visitor-guide cards, highlights cards) so
they arrive sequentially left-to-right.

**Motion**  
- `IntersectionObserver` (threshold 0.12) fires for each section wrapper.
- On trigger: WAAPI `translateY: ['24px', '0px'], opacity: [0, 1], duration: 560,
  easing: 'cubicBezier(0.16, 0.84, 0.18, 0.99)'`.
- Grid children use `anime.stagger(60)` for the enter.
- Each section triggers only once (observer disconnects after firing).

---

## 4 · Card Glass-Water Hover Ripple

**Concept**  
When the user hovers a visitor-guide card or highlights card, a circular ripple — like a
raindrop hitting glass — expands from the pointer entry point. The ripple is a white-to-
transparent radial gradient circle that grows and fades.

**Motion**  
- On `mouseenter`, read `clientX / clientY` relative to card bounds.
- Anime.js animates a pseudo-element (or injected `<span>`) from
  `scale(0), opacity(0.55)` → `scale(3), opacity(0)` over 600 ms.
- Simultaneously the card's `backdrop-blur` increases from 4 px → 8 px and back via a CSS
  transition (not Anime.js — cheapest path).

---

## 5 · Schedule Card Countdown Digit Morph

**Concept**  
Each countdown digit (`Days`, `Hours`, `Minutes`, `Seconds`) animates out with a vertical
slide + blur when it changes, and the new digit arrives from the opposite direction —
like droplets running down a window, each digit "falling" into place.

**Motion**  
- On value change: outgoing `<span>` animates `translateY: ['0px', '-1em'], opacity: [1, 0],
  filter: ['blur(0)', 'blur(6px)'], duration: 220`.
- Incoming `<span>` animates `translateY: ['1em', '0px'], opacity: [0, 1],
  filter: ['blur(6px)', 'blur(0)'], duration: 280, delay: 80`.
- Currently the countdown already swaps key-based spans; the WAAPI hook slots neatly into
  the existing `useVisibleTask$` tick loop.

---

## 6 · Floating Background Orb Breathing

**Concept**  
The two large glow blobs in `FestivalShell` / production hero are given a slow "breathing"
scale + position drift, making the page feel alive. Combined with Idea 1, the fixed bokeh
and these orbs create a multi-depth layered water effect.

**Motion**  
```
anime({
  targets: '.glow-orb-left',
  translateX: ['-6%', '-4%'],
  translateY: ['10%', '12%'],
  scale: [1, 1.06],
  duration: 9000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
})
// Mirror for right orb with different phase/duration
```

---

## 7 · Page Transition — Blur Veil

**Concept**  
When navigating between pages, the outgoing content blurs to `blur(6px), opacity(0)` over
160 ms (faster on mobile), and the incoming content reverses from `blur(6px), opacity(0)`
over 350 ms — matching the `page-enter-active` CSS style from gogatsusai.jp exactly, but
driven by Anime.js for finer choreography and easy reversal logic.

**Implementation notes (Qwik City)**  
- Use Qwik City's `useNavigating$` signal to detect navigation start.
- The outgoing animation triggers on `navigating.value === true`.
- Incoming triggers in the next page's `useVisibleTask$` on mount.

---

## 8 · News List Item Line-Draw Reveal

**Concept**  
The divider line above each news list item "draws" from left to right as it enters the
viewport, reminiscent of rain streaking down glass. The date and title then fade in 80 ms
after the line completes.

**Motion**  
- `scaleX: [0, 1], transformOrigin: 'left center', duration: 380, easing: 'easeOutQuart'`
  on the `<li>` `::before` border (or an absolutely-positioned `<span>`).
- Child date/title: `opacity: [0, 1], translateX: ['-6px', '0'], delay: 80, duration: 320`.

---

## 9 · Scroll Progress Indicator

**Concept**  
A 1 px translucent navy line at the very top of the viewport (`position: fixed`) fills from
left to right as the user scrolls the production home page — subtle, glass-like, professional.

**Motion**  
- Pure CSS + a `--scroll-progress` CSS custom property updated in a passive `scroll`
  listener (`requestAnimationFrame`-throttled).
- No Anime.js needed; included here as a complementary polish item.

---

## 10 · Header Logo Droplet Entrance

**Concept**  
On first render the header logo condensates into view: it starts fully blurred and small
(`scale(0.85), blur(16px), opacity(0)`) and resolves sharply — a single clear droplet forming.

**Motion**  
```
anime({
  targets: '.site-header .logo',
  scale: [0.85, 1],
  filter: ['blur(16px)', 'blur(0)'],
  opacity: [0, 1],
  duration: 800,
  delay: 100,
  easing: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
})
```

---

## Implementation Priority

| # | Idea | Effort | Visual Impact |
|---|------|--------|---------------|
| 1 | Fixed parallax rain-glass bokeh | Medium | ⭐⭐⭐⭐⭐ |
| 2 | Hero title char stagger reveal | Low | ⭐⭐⭐⭐⭐ |
| 3 | Scroll-triggered section fade-up | Low | ⭐⭐⭐⭐ |
| 6 | Orb breathing | Low | ⭐⭐⭐⭐ |
| 4 | Card glass-water hover ripple | Medium | ⭐⭐⭐⭐ |
| 5 | Countdown digit morph | Low | ⭐⭐⭐ |
| 7 | Page blur transition | Medium | ⭐⭐⭐⭐ |
| 8 | News line-draw reveal | Low | ⭐⭐⭐ |
| 10 | Header logo droplet entrance | Low | ⭐⭐⭐ |
| 9 | Scroll progress bar | Very Low | ⭐⭐ |

**Recommended first sprint:** Ideas 1, 2, 3, and 6 — all reinforce the rain-glass theme,
they compose naturally, and Ideas 2/3/6 require very little new code.
