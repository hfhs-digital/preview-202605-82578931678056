import { component$ } from '@builder.io/qwik'

/**
 * Komaba-style title decoration: two SVG lines with loop knots,
 * positioned at the top-left (navy) and bottom-right (coral) of the title block.
 * Animation is driven externally via animejs strokeDashoffset in useVisibleTask$.
 */
export const TitleDeco = component$(() => (
	<div class="pointer-events-none" aria-hidden="true">
		{/* Main navy line — top-left, loop above, draws right-to-left */}
		<svg
			class="title-deco-navy absolute left-0 -top-7 overflow-visible"
			width="196"
			height="28"
			viewBox="0 0 196 28"
			fill="none"
			focusable="false"
		>
			<path
				class="title-deco-navy-path"
				d="M 192 14 L 12 14 a 6 6 0 1 0 -0.001 0"
				stroke="#20425f"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		{/* Main coral line — bottom-right, loop below, draws left-to-right */}
		<svg
			class="title-deco-coral absolute right-0 -bottom-7 overflow-visible"
			width="196"
			height="28"
			viewBox="0 0 196 28"
			fill="none"
			focusable="false"
		>
			<path
				class="title-deco-coral-path"
				d="M 4 14 L 184 14 a 6 6 0 1 1 0.001 0"
				stroke="#d9736a"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
))
