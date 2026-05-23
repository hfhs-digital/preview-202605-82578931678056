import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

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
	{ label: 'お困りの場合', href: '/need-help' },
] as const

export const SiteFooter = component$(() => {
	return (
		<footer class="mt-20 border-t border-festival-line">
			<div class="mx-auto max-w-[1000px] px-6 py-12">
				<div class="grid gap-8 sm:grid-cols-2">
					{/* Site links */}
					<div>
						<p class="mb-3 text-[0.62rem] uppercase tracking-[0.16em] text-festival-muted">
							学園祭Webサイト
						</p>
						<ul class="space-y-2">
							{SITE_LINKS.map(({ label, href }) => (
								<li key={href}>
									<Link
										href={href}
										class="text-[0.8rem] text-festival-navy-soft no-underline transition-colors duration-150 hover:text-festival-navy"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* School links */}
					<div>
						<p class="mb-3 text-[0.62rem] uppercase tracking-[0.16em] text-festival-muted">
							学校法人東福岡学園
						</p>
						<ul class="space-y-2">
							{SCHOOL_LINKS.map(({ label, href }) => (
								<li key={href}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										class="text-[0.8rem] text-festival-navy-soft no-underline transition-colors duration-150 hover:text-festival-navy"
									>
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<p class="mt-10 text-[0.62rem] uppercase tracking-[0.14em] text-festival-muted">
					© 2026 東福岡高等学校 デジタル委員会
				</p>
			</div>
		</footer>
	)
})

