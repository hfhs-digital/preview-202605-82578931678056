import { component$ } from '@builder.io/qwik'
import {
	type DocumentHead,
	type StaticGenerateHandler,
	routeLoader$,
} from '@builder.io/qwik-city'
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
			<main class="mx-auto max-w-[760px] px-6 py-12">
				<h1 class="mb-10 text-[1.8rem] font-semibold leading-snug tracking-[-0.05em] text-festival-navy">
					{page.value.title}
				</h1>

				<div
					class="cms-body"
					dangerouslySetInnerHTML={page.value.content}
				/>
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
