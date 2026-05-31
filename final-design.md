# Final Design Document — HFHS 2026

---

## Part 1 — Current Design Description

### Overall impression
The site reads as a calm, editorial school festival guide built on white paper. It is clean and legible with a restrained Japanese-influenced palette, but currently feels closer to a minimal tech/editorial product than to a festival with distinct Japanese pattern identity. The motion is present but subtle.

### Layout & structure
- **Header**: Sticky frosted-glass bar (94% white + backdrop-blur). A thin coral `rgba(217,115,106,0.32)` hairline sits above the nav. Logo (SchoolFestivalLogo SVG) + name on the left; four uppercase letter-spaced text links on desktop; an animated three-line hamburger that morphs into ✕ on mobile.
- **Hero**: Full-viewport two-column grid on desktop (≥980 px). Left: eyebrow label → large display title → date/school meta → three CTA pill buttons. Right: a photo carousel (5 images, cross-fade every 5 s) inside a bordered frame with a subtle light-leak gradient overlay. On mobile: single column, image below text.
- **For Visitors section**: Six destination links in a two-column icon-row list. Each row has a circular icon badge + label + arrow.
- **Menu section**: Three cards (greeting / news / timetable) in a 3-column grid on desktop.
- **Highlights section**: Six placeholder cards (4:3 aspect photo or placeholder + title + description).
- **News preview section**: Simple vertical list of articles with date + title.
- **About section**: Large heading "最高の青春がここにある。" with a multi-paragraph body text.
- **Schedule section**: Two bordered date cards in a two-column grid.
- **Footer**: Deep navy (`#203042`) background, large logo, two-column link grid, copyright.

### Color palette in practice
- Background: paper white (`#ffffff`)
- Primary text: navy (`#203042`) / dark navy-soft (`#20425f`)
- Muted text: steel (`#6a7787`)
- Accent lines: very subtle coral `rgba(32,48,66,0.12)`
- Decorative blobs: pale blue (`rgba(203,231,255,…)`) — notably, **not** the pale hydrangea lavender/wisteria specified in design.md; the bokeh circles use cool blue, which diverges from the wisteria/lilac direction.

### Typography
- `Outfit` (Latin) + `Noto Sans JP` (Japanese), set via global CSS.
- Hero title: `clamp(3.05rem, 7.2vw, 6rem)`, semibold, tight tracking `-0.08em`.
- Section labels: `0.72rem`, all-caps, wide tracking.

### Existing animations
1. **Hero character stagger** — animejs splits the title into `<span>` characters that fade + translateY up with a 42 ms stagger (total ~900 ms reveal).
2. **Eyebrow / meta / CTA fade-up** — sequential opacity+translateY reveals triggered at page load.
3. **Scroll reveal** — `IntersectionObserver` fires an animejs translate+opacity tween when each `[data-reveal]` section enters the viewport at 8% threshold. Child `[data-reveal-card]` elements get a follow-on stagger.
4. **Hero image carousel** — cross-fade every 5 s via `setInterval`.
5. **BokehLayer** — ten large blurred circles (350–700 px, blur 60–120 px, pale blue tones) with a slow ambient drift loop (alternate, 9.5–17 s) using animejs. Fades in over 2.2 s with per-circle delays.

### What is missing / not yet aligned with design.md
- No visible ichimatsu (hydrangea) pattern structure anywhere.
- No washi-paper texture feel.
- Bokeh colors use cool blue rather than hydrangea lavender/wisteria.
- Titles are left-aligned and split into a two-column hero; design.md calls for large, centered, prominent titles.
- No animated decorative lines or "line-drawing" motion.
- No scroll indicator.
- No section separator ornaments or geometric finishing lines between sections.
- No folded-paper / origami-note style content modules.

---

## Part 2 — Animations & Decorations to Add (inspired by Komaba Festival 76)

The Komaba Festival 76 site (`komabasai.net/76`) stands out for:
- a full-viewport hero with **two large overlapping geometric circles** (deep red + navy) as the main decorative element
- **washi paper texture** applied as a CSS `mask-image` with `mix-blend-mode: multiply` across section separators and the hero image
- **SVG clip-path section separators** — the boundary between hero and content uses a curved/diagonal SVG clip that makes the transition feel like torn paper
- **ichimatsu pattern corner ornaments** placed absolutely inside bordered containers (visible in the CTA button boxes)
- **scroll-down arrow sequence** — three chevron arrows animate in with staggered `fade-in-out` keyframes (0%, 25%, 50%, 75% opacity cycling), guiding the eye downward
- **cascading section entrance** — each section slides or fades in as the page scrolls, with child elements staggering in

Below are the specific additions recommended for HFHS 2026, organized by priority and aligned with design.md:

---

### A. Ichimatsu corner ornaments on the hero title block *(high priority)*
**What**: Place two small ichimatsu grid patterns (alternating pale wisteria / white squares, ~4×4 cells, each cell ~10–12 px) as absolute-positioned decorations — one at the top-left and one at the bottom-right of the hero title area — overlapping the title slightly as described in design.md.

**How**: Pure SVG `<pattern>` element rendered inline, wrapped in a `pointer-events-none` `<div>`. Entrance: fade in + slight scale from `0.85` to `1` via animejs, delayed ~800 ms (after title reveal finishes). Respect `prefers-reduced-motion`.

**Why Komaba**: Komaba uses `ichimatu1` / `ichimatu2` SVG corner blocks in the CTA container corners. The same logic applied to the hero title block would give HFHS a clear Japanese-pattern identity without photography.

---

### B. Animated scroll-down indicator *(high priority)*
**What**: Three small downward-pointing chevrons (or diagonal Komaba-style parallelogram arrows) stacked vertically, positioned near the bottom-center of the hero section. They blink in sequence — first appears at 25%, second at 50%, third at 75% — on a ~1.6 s looping keyframe animation.

**How**: CSS `@keyframes` (three classes, each with a different `animation-delay`). Fade out once the user scrolls past the hero (IntersectionObserver on the hero section; hide on `isIntersecting: false`).

**Why Komaba**: Komaba's scroll arrow (`arrow1/2/3` staggered fade-in-out keyframes) is one of its most polished micro-details. It invites interaction without any text.

---

### C. Section separator lines with ichimatsu rhythm *(medium priority)*
**What**: Replace the bare `border-t border-festival-line` between sections with a thin decorative rule that includes a small centered diamond ornament (◇) or a 3-cell ichimatsu run in wisteria. The rule "draws itself" — a `scaleX` from `0` to `1` animation triggered by IntersectionObserver as the separator enters view.

**How**: A reusable `<SectionDivider />` component. The line is a `div` with `transform-origin: left` that animates `scaleX [0→1]` over 600 ms via animejs when observed.

**Why Komaba**: Komaba uses washi-masked SVG separators between sections. A simpler but thematically correct version is a drawing-in line with a Japanese-pattern pip — aligned with design.md's "line drawing" motion language.

---

### D. Washi / paper-grain texture overlay on key sections *(medium priority)*
**What**: A very subtle paper-grain noise texture (a tiny ~200×200 px repeating SVG noise pattern, or a lightweight WebP) applied as a fixed `background-image` overlay at `opacity: 0.06–0.08` with `mix-blend-mode: multiply` on the hero section and the schedule cards. This adds tactile paper warmth without affecting color readability.

**How**: CSS pseudo-element (`::after`) on the relevant section wrappers. No JavaScript needed. Keep it at ≤8% opacity so it disappears on OLED/high-contrast displays.

**Why Komaba**: Komaba's `.washi-container::before` uses a washi WebP texture at `mix-blend-mode: multiply` — it is the single most impactful reason the site "feels Japanese" even on a screen.

---

### E. Decorative large geometric background circles in the hero *(medium priority)*
**What**: Two large soft circles (similar to Komaba's 610 px red + navy circles) positioned behind the hero title, in pale wisteria (`rgba(166,149,216,0.12)`) and pale indigo (`rgba(32,66,95,0.08)`). They should be partially cropped by the viewport — not centered floating blobs but structural background elements that frame the composition.

**How**: Replace (or supplement) the current single coral radial-gradient blob in the hero. Use two `position: absolute` circles with `border-radius: 50%` and a slow breathing `scale [1 → 1.03]` animation loop (18 s, alternate, animejs). Shift the colors from the current cool-blue bokeh to hydrangea wisteria/lavender to match design.md.

**Why Komaba**: Komaba's two-circle hero motif creates immediate visual depth. The HFHS version should use pale hydrangea tones instead of Komaba's bold red/navy.

---

### F. Hero decorative line "draw-in" animation *(low priority)*
**What**: The horizontal rule next to the eyebrow label already exists. Animate it with `scaleX [0 → 1]` (transform-origin: left) over 500 ms, timed just before the eyebrow text fades in. Gives a "ruling a paper" quality.

**How**: Add a class `hero-eyebrow-rule` to the `<span>` element, then animate it via animejs in the existing `useVisibleTask$` at `delay: 80` (before eyebrow at 120).

**Why Komaba**: Komaba uses SVG stroke-dashoffset line-drawing throughout. This one-liner achieves the same mood without SVG complexity.

---

### G. Origami-note style content modules for the Highlights cards *(low priority, pending photo removal)*
**What**: Replace the current "photo placeholder" box in the Highlights section with a folded-paper note shape: a rectangular card with a top-right corner fold (created via CSS `::before` triangle clipping in wisteria). The fold corner color indicates the category. No photography needed.

**How**: CSS `clip-path` or border-trick on the card's `::before` pseudo-element. Matches design.md's "origami memo / note shapes" and "folded-paper cards" language.

**Why Komaba**: Komaba uses decorative geometric shapes extensively as content framing rather than relying on photography. This aligns perfectly with design.md's "image-free composition" directive.

---

### Summary table

| Item | Priority | Effort | Impact |
|------|----------|--------|--------|
| A. Ichimatsu corner ornaments on hero | High | Medium | High — establishes Japanese pattern identity |
| B. Scroll-down chevron sequence | High | Low | Medium — polished micro-detail |
| C. Washi texture overlay | Medium | Low | High — most impactful paper feel |
| D. Pale geometric hero circles (wisteria/indigo) | Medium | Low | High — fixes color alignment with design.md |
| E. Hero eyebrow rule draw-in | Low | Very low | Low — subtle but correct |
| F. Origami-note card fold in Highlights | High | Medium | Medium — design.md alignment |
