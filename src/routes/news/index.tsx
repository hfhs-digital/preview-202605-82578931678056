import { component$ } from '@builder.io/qwik'
import {
	type DocumentHead,
	Link,
	routeLoader$,
} from '@builder.io/qwik-city'
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
			<main class="mx-auto max-w-[1000px] px-6 pb-12 pt-20">
				<h1 class="mb-8 text-[1.8rem] font-semibold tracking-[-0.05em] text-festival-navy">
					お知らせ
				</h1>

				{!news || news.contents.length === 0 ? (
					<p class="text-festival-muted">お知らせはまだありません。</p>
				) : (
					<ul class="divide-y divide-festival-line">
						{news.contents.map((item) => {
							const isImportant =
								item.category &&
								item.category.length > 0 &&
								item.category[0] === '重要なお知らせ'
							return (
								<li
									key={item.id}
									class={[
										'py-5',
										isImportant ? 'rounded-lg bg-red-50 px-4' : '',
									].join(' ')}
								>
									<Link
										href={`/news/${item.id}`}
										class="group flex flex-col gap-1 no-underline sm:flex-row sm:items-baseline sm:gap-5"
									>
										<time
											dateTime={item.publishedAt}
											class="shrink-0 text-[0.72rem] uppercase tracking-[0.1em] text-festival-muted sm:order-1"
										>
											{new Date(item.publishedAt).toLocaleDateString('ja-JP', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
											})}
										</time>

										<span class="text-[0.96rem] text-festival-text transition-colors duration-150 group-hover:text-festival-navy sm:order-3">
											{item.title}
										</span>

										{item.category && item.category.length > 0 && (
											<span
												class={[
													'w-fit rounded-full border px-2 py-0.5 text-[0.64rem] uppercase tracking-[0.1em] sm:order-2',
													isImportant
														? 'border-red-300 bg-red-100 text-red-700'
														: 'border-festival-line text-festival-muted',
												].join(' ')}
											>
												{item.category[0]}
											</span>
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
