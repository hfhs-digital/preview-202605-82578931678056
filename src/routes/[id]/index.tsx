import { component$ } from '@builder.io/qwik'
import {
	type DocumentHead,
	routeLoader$,
	type StaticGenerateHandler,
} from '@builder.io/qwik-city'
import { PageHeading } from '~/components/page-heading/page-heading'
import { SitePage } from '~/components/site-page/site-page'
import { fetchAllPageIds, fetchCMSPage } from '~/lib/microcms'

export const useCMSPage = routeLoader$(async (requestEvent) => {
	const page = await fetchCMSPage(requestEvent.params.id)
	if (!page) {
		throw requestEvent.error(404, 'Not found')
	}
	return page
})

export default component$(() => {
	const page = useCMSPage()

	return (
		<SitePage>
			<main class="relative mx-auto max-w-[920px] overflow-hidden px-6 pb-16 pt-16">
				<div
					class="pointer-events-none absolute right-[-10%] top-4 -z-10 h-[260px] w-[260px] rounded-full"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 35% 35%, rgba(217,115,106,0.14) 0%, rgba(32,66,95,0.06) 38%, rgba(255,255,255,0) 74%)',
					}}
				/>

				<PageHeading
					title={page.value.title}
					subline="Higashi Fukuoka School Festival 2026"
				/>

				<article class="border border-festival-line bg-white px-6 py-8 shadow-[0_10px_28px_rgba(32,48,66,0.04)] sm:px-8 sm:py-10">
					<div
						class="cms-body [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6"
						dangerouslySetInnerHTML={page.value.content}
					/>
				</article>
			</main>
		</SitePage>
	)
})

export const onStaticGenerate: StaticGenerateHandler = async () => {
	const ids = await fetchAllPageIds()
	return { params: ids.map((id) => ({ id })) }
}

export const head: DocumentHead = ({ resolveValue }) => {
	const page = resolveValue(useCMSPage)
	return {
		title: `${page.title} — 東福岡学園祭 2026`,
		meta: page.description
			? [{ name: 'description', content: page.description }]
			: [],
	}
}
