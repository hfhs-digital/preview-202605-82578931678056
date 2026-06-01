import { component$ } from '@builder.io/qwik'
import schoolFestivalLogo from '~/pictures/school-festival-logo.png'

type SchoolFestivalLogoProps = {
	class?: string
	alt?: string
	tone?: 'light' | 'ink'
}

export const SchoolFestivalLogo = component$<SchoolFestivalLogoProps>(
	({ class: className, alt = '東福岡学園祭 2026 ロゴ', tone = 'light' }) => {
		return (
			<img
				src={schoolFestivalLogo}
				width={1500}
				height={1500}
				alt={alt}
				decoding="sync"
				loading="eager"
				class={['block h-auto w-full object-contain', className]
					.filter(Boolean)
					.join(' ')}
				style={{
					filter: tone === 'ink' ? 'brightness(0) saturate(100%)' : undefined,
				}}
			/>
		)
	},
)
