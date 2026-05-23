import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { SitePage } from '~/components/site-page/site-page'

export default component$(() => {
	return (
		<SitePage>
			<main class="mx-auto max-w-[760px] px-6 py-12">
				<h1 class="mb-4 text-[1.8rem] font-semibold leading-snug tracking-[-0.05em] text-festival-navy">
					校内マップ
				</h1>
				<p class="mb-10 text-[0.88rem] text-festival-muted">
					2026年度の校内マップは近日公開予定です。
				</p>

				{/* Ground / outdoor area */}
				<div class="mb-6 rounded-[4px] border border-festival-line bg-[rgba(255,255,255,0.55)] p-6 backdrop-blur-sm">
					<p class="mb-3 text-[0.68rem] uppercase tracking-[0.12em] text-festival-muted">
						グラウンド
					</p>
					<div class="flex h-40 items-center justify-center rounded-[2px] bg-[rgba(20,48,79,0.04)]">
						<p class="text-[0.76rem] uppercase tracking-[0.1em] text-festival-muted">
							近日公開
						</p>
					</div>
				</div>

				{/* Placeholder floors */}
				{(['1階', '2階', '3階', '4階', '5階'] as const).map((floor) => (
					<div
						key={floor}
						class="mb-6 rounded-[4px] border border-festival-line bg-[rgba(255,255,255,0.55)] p-6 backdrop-blur-sm"
					>
						<p class="mb-3 text-[0.68rem] uppercase tracking-[0.12em] text-festival-muted">
							{floor}
						</p>
						<div class="flex h-40 items-center justify-center rounded-[2px] bg-[rgba(20,48,79,0.04)]">
							<p class="text-[0.76rem] uppercase tracking-[0.1em] text-festival-muted">
								近日公開
							</p>
						</div>
					</div>
				))}

				<p class="mt-8 text-[0.78rem] leading-[1.8] text-festival-muted">
					4・5階（記念講堂）で行うイベントのスケジュールは
					タイムテーブルをご確認ください。
				</p>
			</main>
		</SitePage>
	)
})

export const head: DocumentHead = {
	title: '校内マップ — 東福岡学園祭 2026',
	meta: [
		{
			name: 'description',
			content: '東福岡学園祭 2026 の校内マップ。各フロアの展示・模擬店・施設の場所をご確認いただけます。',
		},
	],
}
