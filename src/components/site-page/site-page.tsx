import { component$, Slot } from '@builder.io/qwik'
import { SiteFooter } from '~/components/site-footer/site-footer'
import { SiteHeader } from '~/components/site-header/site-header'

export const SitePage = component$(() => {
	return (
		<div class="relative min-h-screen bg-[var(--color-paper-0)]">
			<SiteHeader />
			<Slot />
			<SiteFooter />
		</div>
	)
})
