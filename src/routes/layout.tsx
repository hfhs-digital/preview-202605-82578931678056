import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { NoticeBar } from '~/components/notice-bar/notice-bar'
import { fetchImportantNews } from '~/lib/microcms'

export const useImportantNews = routeLoader$(async () => {
	return await fetchImportantNews()
})

export default component$(() => {
	const news = useImportantNews()

	return (
		<>
			{news.value && (
				<NoticeBar title={news.value.title} newsId={news.value.link.id} />
			)}
			<Slot />
		</>
	)
})
