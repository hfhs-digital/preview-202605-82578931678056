import { component$ } from '@builder.io/qwik'
import { type DocumentHead, Link } from '@builder.io/qwik-city'
import { PageHeading } from '~/components/page-heading/page-heading'
import { SitePage } from '~/components/site-page/site-page'

const FLOORS = ['1階', '2階', '3階', '4階', '5階'] as const

export default component$(() => {
	return (
		<SitePage>
			<main class="relative mx-auto max-w-[1040px] overflow-hidden px-6 pb-16 pt-16">
				<div
					class="pointer-events-none absolute right-[-10%] top-0 -z-10 h-[300px] w-[300px] rounded-full"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 35% 35%, rgba(32,66,95,0.12) 0%, rgba(217,115,106,0.08) 34%, rgba(255,255,255,0) 74%)',
					}}
				/>

				<PageHeading
					title="校内マップ"
					subline="Higashi Fukuoka School Festival 2026"
				/>

				<section class="mb-8 border border-[rgba(32,48,66,0.12)] bg-white p-6 shadow-[0_10px_28px_rgba(32,48,66,0.04)]">
					<div class="mb-4 flex items-center justify-between gap-4 max-[640px]:flex-col max-[640px]:items-start">
						<div>
							<h2 class="festival-display text-[1.4rem] font-semibold tracking-[-0.04em] text-[rgb(32,48,66)]">
								グラウンド・屋外エリア
							</h2>
						</div>
						<p class="text-[0.78rem] text-[rgba(66,84,104,0.86)]">
							校内全体図とあわせて近日公開予定
						</p>
					</div>

					<div class="flex h-52 items-center justify-center border border-[rgba(32,48,66,0.08)] bg-[rgba(250,250,248,0.92)]">
						<p class="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(66,84,104,0.76)]">
							近日公開
						</p>
					</div>
				</section>

				<div class="grid gap-6 md:grid-cols-2">
					{FLOORS.map((floor) => (
						<section
							key={floor}
							class="border border-[rgba(32,48,66,0.12)] bg-white p-6 shadow-[0_10px_28px_rgba(32,48,66,0.04)]"
						>
							<h2 class="festival-display text-[1.25rem] font-semibold tracking-[-0.04em] text-[rgb(32,48,66)]">
								{floor}
							</h2>
							<div class="mt-5 flex h-44 items-center justify-center border border-[rgba(32,48,66,0.08)] bg-[rgba(250,250,248,0.92)]">
								<p class="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(66,84,104,0.76)]">
								近日公開
								</p>
							</div>
						</section>
					))}
				</div>

				<p class="festival-copy mt-8 text-[0.92rem] leading-[1.9] text-[rgba(66,84,104,0.9)]">
					4・5階（記念講堂）で行うイベントの時間帯は、{' '}
					<Link
						href="/timetable"
						class="text-[rgb(32,66,95)] underline underline-offset-4"
					>
						タイムテーブル
					</Link>
					をご確認ください。
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
			content:
				'東福岡学園祭 2026 の校内マップ。各フロアの展示・模擬店・施設の場所をご確認いただけます。',
		},
	],
}
