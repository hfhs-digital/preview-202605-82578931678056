import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

type NoticeBarProps = {
	title: string
	newsId: string
}

export const NoticeBar = component$<NoticeBarProps>(({ title, newsId }) => {
	return (
		<div class="fixed left-4 top-20 z-50 max-w-[min(28rem,calc(100vw-2rem))]">
			<Link
				href={`/news/${newsId}`}
				class="flex items-center gap-3 border border-[rgba(32,66,95,0.12)] bg-[rgba(255,255,255,0.96)] px-4 py-3 text-[0.9rem] text-[rgb(32,48,66)] no-underline shadow-[0_14px_36px_rgba(32,48,66,0.08)] backdrop-blur-sm transition duration-150 ease-out hover:-translate-y-px hover:border-[rgba(141,54,47,0.22)]"
			>
				<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(217,115,106,0.18)] text-[rgba(32,66,95,0.82)]">
					📣
				</span>
				<span class="min-w-0">
					<span class="mb-0.5 block text-[0.58rem] uppercase tracking-wider text-[rgba(141,54,47,0.82)]">
						重要なお知らせ
					</span>
					<span class="block truncate text-[1rem]">{title}</span>
				</span>
			</Link>
		</div>
	)
})
