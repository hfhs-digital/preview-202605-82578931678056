import { component$, Slot } from '@builder.io/qwik'
import { BokehLayer } from '~/components/bokeh-layer/bokeh-layer'
import { SiteFooter } from '~/components/site-footer/site-footer'
import { SiteHeader } from '~/components/site-header/site-header'

export const SitePage = component$(() => {
	return (
		<div class="relative min-h-screen bg-paper-0">
			<BokehLayer />
			<SiteHeader />
			<Slot />
			<SiteFooter />
		</div>
	)
})
