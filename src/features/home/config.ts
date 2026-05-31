import type { DocumentHead } from '@builder.io/qwik-city'

export type HomePageVariant = 'coming-soon' | 'production'

export const HOME_PAGE_VARIANT: HomePageVariant = 'production'

const HOME_PAGE_HEADS: Record<HomePageVariant, DocumentHead> = {
	'coming-soon': {
		title: 'Higashi Fukuoka School Festival 2026 | Coming Soon',
		meta: [
			{
				name: 'description',
				content:
					'Clean coming soon page for the Higashi Fukuoka High School Festival 2026 with a live countdown to the festival opening.',
			},
		],
	},
	production: {
		title: 'Higashi Fukuoka School Festival 2026',
		meta: [
			{
				name: 'description',
				content:
					'Official website for the Higashi Fukuoka High School Festival 2026.',
			},
		],
	},
}

export const homePageHead = HOME_PAGE_HEADS[HOME_PAGE_VARIANT]
