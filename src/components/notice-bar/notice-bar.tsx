import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

type NoticeBarProps = {
	title: string
	newsId: string
}

export const NoticeBar = component$<NoticeBarProps>(({ title, newsId }) => {
	return (
		<div class="fixed left-4 top-[4.5rem] z-50 max-w-[calc(100vw-2rem)]">
			<Link
				href={`/news/${newsId}`}
				class="flex items-center gap-2 rounded-full border border-festival-line bg-[rgba(255,255,255,0.92)] px-3.5 py-2 text-[1rem] text-festival-navy no-underline shadow-sm backdrop-blur-sm transition duration-150 ease-out hover:-translate-y-px hover:bg-white"
			>
				<span aria-hidden="true">📣</span>
				<span class="max-w-90 truncate">{title}</span>
			</Link>
		</div>
	)
})
