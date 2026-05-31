import { component$ } from '@builder.io/qwik'
import {
	type DocumentHead,
	routeLoader$,
	type StaticGenerateHandler,
} from '@builder.io/qwik-city'
import { PageHeading } from '~/components/page-heading/page-heading'
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
	const category =
		article.value.category && article.value.category.length > 0
			? article.value.category[0]
			: undefined

	return (
		<SitePage>
			<main class="relative mx-auto max-w-[920px] overflow-hidden px-6 pb-16 pt-16">
				<div
					class="pointer-events-none absolute right-[-10%] top-4 -z-10 h-[260px] w-[260px] rounded-full"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 35% 35%, rgba(32,66,95,0.12) 0%, rgba(217,115,106,0.08) 34%, rgba(255,255,255,0) 74%)',
					}}
				/>

				<PageHeading
					title={article.value.title}
					subline="Higashi Fukuoka School Festival 2026"
				/>

				{category && (
					<p class="mb-6 w-fit border border-[rgba(32,48,66,0.1)] px-3 py-1 text-[0.64rem] uppercase tracking-[0.14em] text-[rgba(66,84,104,0.82)]">
						{category}
					</p>
				)}

				<article class="sm:px-8 sm:py-10">
					<div
						class="cms-body"
						dangerouslySetInnerHTML={article.value.content}
					/>
				</article>
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
