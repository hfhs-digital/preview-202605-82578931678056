import { component$ } from '@builder.io/qwik'
import { HOME_PAGE_VARIANT } from './config'
import { ComingSoonHomePage } from './pages/coming-soon-home-page'
import { ProductionHomePage } from './pages/production-home-page'

export const HomePage = component$(() => {
	if (HOME_PAGE_VARIANT === 'production') {
		return <ProductionHomePage />
	}

	return <ComingSoonHomePage />
})
