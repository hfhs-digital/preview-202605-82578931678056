import { component$ } from '@builder.io/qwik'

/**
 * Decorative section divider with an animated coral ◇ pip and two expanding lines.
 * Animation is driven externally via IntersectionObserver in useVisibleTask$.
 */
export const SectionDivider = component$(() => (
	<div
		class="section-divider mx-auto flex max-w-[1000px] items-center gap-3 px-6 py-1"
		aria-hidden="true"
	>
		<span class="section-divider-left h-px flex-1 origin-left scale-x-0 bg-[rgba(217,115,106,0.22)]" />
		<span class="text-[0.5rem] text-[rgba(217,115,106,0.6)]">◇</span>
		<span class="section-divider-right h-px flex-1 origin-right scale-x-0 bg-[rgba(217,115,106,0.22)]" />
	</div>
))
