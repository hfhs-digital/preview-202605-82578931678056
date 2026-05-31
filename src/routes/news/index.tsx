import { component$ } from '@builder.io/qwik'
import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city'
import { PageHeading } from '~/components/page-heading/page-heading'
import { SitePage } from '~/components/site-page/site-page'
import { fetchNewsList } from '~/lib/microcms'

export const useNewsList = routeLoader$(async () => {
	return await fetchNewsList(40)
})

export default component$(() => {
	const data = useNewsList()
	const news = data.value

	return (
		<SitePage>
			<main class="relative mx-auto max-w-[1040px] overflow-hidden px-6 pb-16 pt-16">
				<div
					class="pointer-events-none absolute right-[-8%] top-2 -z-10 h-[280px] w-[280px] rounded-full"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 35% 35%, rgba(217,115,106,0.16) 0%, rgba(217,115,106,0.08) 26%, rgba(32,66,95,0.05) 46%, rgba(255,255,255,0) 74%)',
					}}
				/>

				<PageHeading
					title="お知らせ"
					subline="Higashi Fukuoka School Festival 2026"
				/>

				{!news || news.contents.length === 0 ? (
					<div class="border border-[rgba(32,48,66,0.12)] bg-[rgba(250,250,248,0.9)] px-6 py-10 shadow-[0_10px_28px_rgba(32,48,66,0.04)]">
						<p class="m-0 text-[0.94rem] text-[rgba(66,84,104,0.9)]">
							お知らせはまだありません。
						</p>
					</div>
				) : (
					<ul class="border-y border-[rgba(32,48,66,0.1)]">
						{news.contents.map((item) => {
							const isImportant =
								item.category &&
								item.category.length > 0 &&
								item.category[0] === '重要なお知らせ'

							return (
								<li
									key={item.id}
									class={[
										'relative border-b border-[rgba(32,48,66,0.1)] last:border-b-0',
										isImportant ? 'bg-[rgba(217,115,106,0.06)]' : 'bg-white',
									].join(' ')}
								>
									<Link
										href={`/news/${item.id}`}
										class="group grid gap-3 px-5 py-5 no-underline min-[760px]:grid-cols-[150px_minmax(0,1fr)_auto] min-[760px]:items-baseline"
									>
										<time
											dateTime={item.publishedAt}
											class="text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(66,84,104,0.82)]"
										>
											{new Date(item.publishedAt).toLocaleDateString('ja-JP', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
											})}
										</time>

										<span class="festival-display text-[1.08rem] leading-[1.45] tracking-[-0.03em] text-[rgb(32,48,66)] transition-colors duration-150 group-hover:text-[rgb(32,66,95)]">
											{item.title}
										</span>

										{item.category && item.category.length > 0 ? (
											<span
												class={[
													'w-fit border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em]',
													isImportant
														? 'border-[rgba(217,115,106,0.26)] bg-[rgba(255,255,255,0.72)] text-[rgba(141,54,47,0.9)]'
														: 'border-[rgba(32,48,66,0.1)] text-[rgba(66,84,104,0.82)]',
												].join(' ')}
											>
												{item.category[0]}
											</span>
										) : (
											<span
												class="hidden min-[760px]:block"
												aria-hidden="true"
											/>
										)}
									</Link>
								</li>
							)
						})}
					</ul>
				)}
			</main>
		</SitePage>
	)
})

export const head: DocumentHead = {
	title: 'お知らせ — 東福岡学園祭 2026',
	meta: [
		{
			name: 'description',
			content: '東福岡学園祭 2026 公式サイトのお知らせ一覧。',
		},
	],
}
