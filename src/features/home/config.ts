import type { DocumentHead } from '@builder.io/qwik-city'

export type HomePageVariant = 'coming-soon' | 'production'

export const HOME_PAGE_VARIANT: HomePageVariant = 'production'

const HOME_PAGE_HEADS: Record<HomePageVariant, DocumentHead> = {
	'coming-soon': {
		title: '東福岡学園祭 2026 | 近日公開',
		meta: [
			{
				name: 'description',
				content:
					'ライブカウントダウンつきの東福岡学園祭 2026の近日公開ページ',
			},
		],
	},
	production: {
		title: '東福岡学園祭 2026',
		meta: [
			{
				name: 'description',
				content:
					'東福岡学園祭 2026の公式Webページ',
			},
		],
	},
}

export const homePageHead = HOME_PAGE_HEADS[HOME_PAGE_VARIANT]
