import { Slot, component$, useVisibleTask$ } from '@builder.io/qwik'
import { BokehLayer } from '~/components/bokeh-layer/bokeh-layer'
import { SiteFooter } from '~/components/site-footer/site-footer'
import { SiteHeader } from '~/components/site-header/site-header'

/**
 * Shared wrapper for all "real" site pages (news, CMS pages, etc.).
 * Renders BokehLayer (fixed background) + SiteHeader + slot content + SiteFooter.
 *
 * BokehLayer sits at z-index:0; the content wrapper is z-index:1 so all
 * page content, including the sticky header, renders above the bokeh.
 *
 * Not used on the coming soon page or the 404 page, which manage their own
 * full-viewport layout via FestivalShell.
 */
export const SitePage = component$(() => {
	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		const bar = document.querySelector<HTMLElement>('.scroll-progress')
		if (!bar) return

		const onScroll = () => {
			const scrolled = document.documentElement.scrollTop
			const max =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight
			if (max <= 0) return
			bar.style.transform = `scaleX(${scrolled / max})`
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		cleanup(() => window.removeEventListener('scroll', onScroll))
	})

	return (
		<>
			{/* Fixed bokeh light layer — must be below z-index:1 content wrapper */}
			<BokehLayer />

			{/* Scroll progress indicator */}
			<div
				class="scroll-progress pointer-events-none"
				aria-hidden="true"
			/>

			{/* All page content in its own stacking context (z-1) above bokeh (z-0) */}
			<div style="position:relative; z-index:1;">
				<SiteHeader />
				<Slot />
				<SiteFooter />
			</div>
		</>
	)
})
