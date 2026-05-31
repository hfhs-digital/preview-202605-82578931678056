import { component$ } from '@builder.io/qwik'
import { HeroOrnament } from '~/components/hero-ornament/hero-ornament'

type PageHeadingProps = {
	title: string
	subline?: string
}

export const PageHeading = component$<PageHeadingProps>(
	({ title, subline }) => {
		return (
			<div class="relative mb-12 max-w-176 overflow-visible">
				<HeroOrnament
					id="ph"
					class="pointer-events-none absolute -right-4 -top-4 scale-50 opacity-55"
				/>
				<h1 class="festival-display mt-8 text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[0.94] text-[rgb(32,48,66)] max-[680px]:text-[clamp(2.35rem,10vw,3.7rem)]">
					{title}
				</h1>

				{subline && (
					<p class="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(141,54,47,0.8)]">
						{subline}
					</p>
				)}
			</div>
		)
	},
)
