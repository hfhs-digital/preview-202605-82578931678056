import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { SchoolFestivalLogo } from '~/components/school-festival-logo/school-festival-logo'

const SCHOOL_LINKS = [
	{
		label: '学校法人東福岡学園',
		href: 'https://www.higashifukuoka.ed.jp',
	},
	{
		label: '東福岡高等学校',
		href: 'https://www.higashifukuoka.ed.jp/highschool/',
	},
	{
		label: '東福岡自彊館中学校',
		href: 'https://www.higashifukuoka.ed.jp/juniorhighschool/',
	},
	{
		label: '中学校学園祭サイト',
		href: 'https://hfjjdigital.wixsite.com/higashi',
	},
] as const

const SITE_LINKS = [
	{ label: 'お知らせ', href: '/news' },
	{ label: 'マップ', href: '/map' },
	{ label: 'タイムテーブル', href: '/timetable' },
	{ label: 'アクセス', href: '/access' },
	{ label: '来場される際の注意事項', href: '/cautions' },
	{ label: 'お子様連れの方へ', href: '/with-children' },
	{ label: 'ごあいさつ', href: '/greeting' },
	{ label: 'お困りの場合', href: '/need-help' },
] as const

export const SiteFooter = component$(() => {
	return (
		<footer class="mt-20 bg-[rgb(32,48,66)] text-white">
			<div class="h-px w-full bg-[rgba(217,115,106,0.42)]" aria-hidden="true" />
			<div class="mx-auto max-w-280 px-6 py-14">
				<div class="mb-10 flex items-center gap-5">
					<span class="flex h-20 w-20 shrink-0 items-center justify-center">
						<SchoolFestivalLogo class="h-full w-full" alt="" />
					</span>
					<div>
						<p class="m-0 text-[0.62rem] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.66)]">
							Higashi Fukuoka School Festival
						</p>
						<p class="festival-display m-0 mt-1 text-[1.2rem] font-semibold tracking-[-0.03em] text-white">
							東福岡学園祭 2026
						</p>
					</div>
				</div>

				<div class="grid gap-10 sm:grid-cols-2">
					<div>
						<p class="mb-4 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.6)]">
							学園祭Webサイト
						</p>
						<ul class="space-y-2.5">
							{SITE_LINKS.map(({ label, href }) => (
								<li key={href}>
									<Link
										href={href}
										class="text-[0.84rem] text-[rgba(255,255,255,0.86)] no-underline transition-colors duration-150 hover:text-white"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p class="mb-4 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.6)]">
							学校法人東福岡学園
						</p>
						<ul class="space-y-2.5">
							{SCHOOL_LINKS.map(({ label, href }) => (
								<li key={href}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										class="text-[0.84rem] text-[rgba(255,255,255,0.86)] no-underline transition-colors duration-150 hover:text-white"
									>
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<p class="mt-12 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.56)]">
					© 2026 東福岡高等学校 デジタル委員会
				</p>
			</div>
		</footer>
	)
})
