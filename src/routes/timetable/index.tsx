import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { SitePage } from '~/components/site-page/site-page'

export default component$(() => {
	return (
		<SitePage>
			<main class="mx-auto max-w-[760px] px-6 py-12">
				<h1 class="mb-4 text-[1.8rem] font-semibold leading-snug tracking-[-0.05em] text-festival-navy">
					タイムテーブル
				</h1>
				<p class="mb-10 text-[0.88rem] text-festival-muted">
					2026年度のタイムテーブルは近日公開予定です。
				</p>

				{/* Day placeholders */}
				{(
					[
						{ label: '1日目', date: '6月12日', iso: '2026-06-12' },
						{ label: '2日目', date: '6月13日', iso: '2026-06-13' },
					] as const
				).map(({ label, date, iso }) => (
					<div
						key={iso}
						class="mb-6 rounded-[4px] border border-festival-line bg-[rgba(255,255,255,0.55)] p-6 backdrop-blur-sm"
					>
						<p class="mb-1 text-[0.68rem] uppercase tracking-[0.12em] text-festival-muted">
							{label}
						</p>
						<time
							dateTime={iso}
							class="mb-4 block text-[1.3rem] font-semibold tracking-[-0.05em] text-festival-navy"
						>
							{date}
						</time>
						<div class="flex h-48 items-center justify-center rounded-[2px] bg-[rgba(20,48,79,0.04)]">
							<p class="text-[0.76rem] uppercase tracking-[0.1em] text-festival-muted">
								近日公開
							</p>
						</div>
					</div>
				))}

				<p class="mt-6 text-[0.78rem] leading-[1.8] text-festival-muted">
					センターサークル・記念講堂・ICT教室で行われるイベントのスケジュールを掲載予定です。
				</p>
			</main>
		</SitePage>
	)
})

export const head: DocumentHead = {
	title: 'タイムテーブル — 東福岡学園祭 2026',
	meta: [
		{
			name: 'description',
			content: '東福岡学園祭 2026 のタイムテーブル。センターサークル・記念講堂・ICT教室のイベントスケジュール。',
		},
	],
}
