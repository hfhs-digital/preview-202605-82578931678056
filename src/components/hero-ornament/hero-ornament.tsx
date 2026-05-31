import { component$ } from '@builder.io/qwik'

/**
 * Komaba-style circle-arc corner ornament.
 *
 * Renders a 2×2 grid of masked circle arcs in pale wisteria/blush tones.
 * Each cell contains two arcs: one from a circle at the outer corner of the grid
 * and one from the shared circle at the grid center, creating an interlocking sweep.
 * Two filled crescents (intersections of adjacent circles) add subtle depth.
 *
 * Usage: place absolutely at a corner of the hero title block.
 * id   : unique string used to namespace internal SVG clipPath ids.
 */
type HeroOrnamentProps = {
	id: string
	class?: string
}

export const HeroOrnament = component$<HeroOrnamentProps>(
	({ id, class: className }) => {
		const c = 44 // cell size
		const r = 42 // circle radius (just under cell → large sweeping arc)
		const sw = 1.5 // stroke width

		// stroke colors
		const s1 = 'rgba(166,149,216,0.52)' // wisteria – outer corner arcs
		const s2 = 'rgba(166,149,216,0.30)' // lighter – center circle arcs

		// prefix for SVG ids
		const p = `ho-${id}`

		return (
			<svg
				width={c * 2}
				height={c * 2}
				viewBox={`0 0 ${c * 2} ${c * 2}`}
				fill="none"
				aria-hidden="true"
				focusable="false"
				class={className}
			>
				<defs>
					{/* Cell clip paths — restrict each circle arc to its cell */}
					<clipPath id={`${p}-ca`}>
						<rect width={c} height={c} />
					</clipPath>
					<clipPath id={`${p}-cb`}>
						<rect x={c} width={c} height={c} />
					</clipPath>
					<clipPath id={`${p}-cc`}>
						<rect y={c} width={c} height={c} />
					</clipPath>
					<clipPath id={`${p}-cd`}>
						<rect x={c} y={c} width={c} height={c} />
					</clipPath>

					{/* Crescent clip paths — circle-based, for the filled intersections */}
					<clipPath id={`${p}-cca`}>
						<circle cx="0" cy="0" r={r} />
					</clipPath>
					<clipPath id={`${p}-ccd`}>
						<circle cx={c * 2} cy={c * 2} r={r} />
					</clipPath>
				</defs>

				{/*
				 * Outer-corner arcs (stroked, col s1)
				 * Each circle is centered at an outer corner of the 88×88 grid.
				 * Clipped to the adjacent cell, it shows a large diagonal sweep
				 * from one edge near the center to the adjacent edge near the corner.
				 */}
				<circle
					cx="0"
					cy="0"
					r={r}
					stroke={s1}
					stroke-width={sw}
					clip-path={`url(#${p}-ca)`}
				/>
				<circle
					cx={c * 2}
					cy="0"
					r={r}
					stroke={s1}
					stroke-width={sw}
					clip-path={`url(#${p}-cb)`}
				/>
				<circle
					cx="0"
					cy={c * 2}
					r={r}
					stroke={s1}
					stroke-width={sw}
					clip-path={`url(#${p}-cc)`}
				/>
				<circle
					cx={c * 2}
					cy={c * 2}
					r={r}
					stroke={s1}
					stroke-width={sw}
					clip-path={`url(#${p}-cd)`}
				/>

				{/*
				 * Center arcs (stroked, col s2)
				 * One circle at (44,44) split across all four cells — together
				 * these form a complete ring, lighter to sit behind the outer arcs.
				 */}
				<circle
					cx={c}
					cy={c}
					r={r}
					stroke={s2}
					stroke-width={sw}
					clip-path={`url(#${p}-ca)`}
				/>
				<circle
					cx={c}
					cy={c}
					r={r}
					stroke={s2}
					stroke-width={sw}
					clip-path={`url(#${p}-cb)`}
				/>
				<circle
					cx={c}
					cy={c}
					r={r}
					stroke={s2}
					stroke-width={sw}
					clip-path={`url(#${p}-cc)`}
				/>
				<circle
					cx={c}
					cy={c}
					r={r}
					stroke={s2}
					stroke-width={sw}
					clip-path={`url(#${p}-cd)`}
				/>

				{/*
				 * Filled crescents — lens-shaped intersections of adjacent circles.
				 * Cell A: intersection of circle(0,0) and circle(44,44).
				 *   Lens runs diagonally from ≈(2,42) to ≈(42,2).
				 *   Rendered by filling circle(44,44) clipped to circle(0,0).
				 */}
				<circle
					cx={c}
					cy={c}
					r={r}
					fill="rgba(166,149,216,0.14)"
					clip-path={`url(#${p}-cca)`}
				/>
				{/*
				 * Cell D: intersection of circle(88,88) and circle(44,44).
				 *   Blush accent — pale coral tint at the opposite corner.
				 */}
				<circle
					cx={c}
					cy={c}
					r={r}
					fill="rgba(217,115,106,0.09)"
					clip-path={`url(#${p}-ccd)`}
				/>
			</svg>
		)
	},
)
