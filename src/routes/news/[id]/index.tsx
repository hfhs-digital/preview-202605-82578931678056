import { component$ } from '@builder.io/qwik'
import {
	type DocumentHead,
	type StaticGenerateHandler,
	routeLoader$,
} from '@builder.io/qwik-city'
import { SitePage } from '~/components/site-page/site-page'
import { fetchAllNewsIds, fetchNewsArticle } from '~/lib/microcms'

export const useArticle = routeLoader$(async (requestEvent) => {
	const article = await fetchNewsArticle(requestEvent.params.id)
	if (!article) {
		throw requestEvent.error(404, 'Not found')
	}
	return article
})

export default component$(() => {
	const article = useArticle()

	return (
		<SitePage>
			<main class="mx-auto max-w-[760px] px-6 py-12">
				<div class="mb-2 text-[0.72rem] uppercase tracking-[0.1em] text-festival-muted">
					{new Date(article.value.publishedAt).toLocaleDateString('ja-JP', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					})}
				</div>

				<h1 class="mb-10 text-[1.8rem] font-semibold leading-snug tracking-[-0.05em] text-festival-navy">
					{article.value.title}
				</h1>

				<div
					class="cms-body"
					dangerouslySetInnerHTML={article.value.content}
				/>
			</main>
		</SitePage>
	)
})

export const onStaticGenerate: StaticGenerateHandler = async () => {
	const ids = await fetchAllNewsIds()
	return { params: ids.map((id) => ({ id })) }
}

export const head: DocumentHead = ({ resolveValue }) => {
	const article = resolveValue(useArticle)
	return {
		title: `${article.title} — 東福岡学園祭 2026`,
		meta: [{ name: 'description', content: article.title }],
	}
}
