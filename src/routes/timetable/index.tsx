import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PageHeading } from '~/components/page-heading/page-heading'
import { SitePage } from '~/components/site-page/site-page'

const DAYS = [
	{
		label: 'Day 1',
		date: '6月12日',
		iso: '2026-06-12',
		audience: '在校生・保護者のみ（要申込）',
	},
	{ label: 'Day 2', date: '6月13日', iso: '2026-06-13', audience: '一般公開' },
] as const

export default component$(() => {
	return (
		<SitePage>
			<main class="relative mx-auto max-w-[1040px] overflow-hidden px-6 pb-16 pt-16">
				<div
					class="pointer-events-none absolute right-[-8%] top-2 -z-10 h-[280px] w-[280px] rounded-full"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 35% 35%, rgba(217,115,106,0.14) 0%, rgba(32,66,95,0.08) 36%, rgba(255,255,255,0) 74%)',
					}}
				/>

				<PageHeading
					title="タイムテーブル"
					subline="Higashi Fukuoka School Festival 2026"
				/>

				<div class="grid gap-6 md:grid-cols-2">
					{DAYS.map(({ label, date, iso, audience }) => (
						<section
							key={iso}
							class="border border-[rgba(32,48,66,0.12)] bg-white p-6 shadow-[0_10px_28px_rgba(32,48,66,0.04)]"
						>
							<p class="mb-2 text-[0.64rem] uppercase tracking-[0.16em] text-[rgba(66,84,104,0.82)]">
								{label}
							</p>
							<time
								dateTime={iso}
								class="festival-display block text-[1.7rem] font-semibold tracking-[-0.05em] text-[rgb(32,48,66)]"
							>
								{date}
							</time>
							<p class="mt-3 inline-block border border-[rgba(32,48,66,0.1)] px-3 py-1 text-[0.64rem] uppercase tracking-[0.14em] text-[rgba(141,54,47,0.88)]">
								{audience}
							</p>
							<div class="mt-6 flex h-52 items-center justify-center border border-[rgba(32,48,66,0.08)] bg-[rgba(250,250,248,0.92)]">
								<p class="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(66,84,104,0.76)]">
									Timetable Coming Soon
								</p>
							</div>
						</section>
					))}
				</div>
			</main>
		</SitePage>
	)
})

export const head: DocumentHead = {
	title: 'タイムテーブル — 東福岡学園祭 2026',
	meta: [
		{
			name: 'description',
			content:
				'東福岡学園祭 2026 のタイムテーブル。センターサークル・記念講堂・ICT教室のイベントスケジュール。',
		},
	],
}
