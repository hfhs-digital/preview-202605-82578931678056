import { component$, useSignal } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { OrigamiEmblem } from '~/components/origami-emblem/origami-emblem'
import { SchoolFestivalLogo } from '~/components/school-festival-logo/school-festival-logo'

const NAV_GROUPS = [
	{
		label: '学園祭を楽しむ',
		links: [
			{ href: '/news', label: 'お知らせ' },
			{ href: '/map', label: 'マップ' },
			{ href: '/timetable', label: 'タイムテーブル' },
		],
	},
	{
		label: '学園祭について',
		links: [
			{ href: '/access', label: 'アクセス' },
			{ href: '/cautions', label: '来場される際の注意事項' },
			{ href: '/with-children', label: 'お子様連れの方へ' },
			{ href: '/greeting', label: 'ごあいさつ' },
			{ href: '/need-help', label: 'お困りの場合' },
		],
	},
] as const

const DESKTOP_NAV = [
	{ href: '/news', label: 'お知らせ' },
	{ href: '/map', label: 'マップ' },
	{ href: '/timetable', label: 'タイムテーブル' },
	{ href: '/access', label: 'アクセス' },
] as const

export const SiteHeader = component$(() => {
	const open = useSignal(false)

	return (
		<>
			<header class="sticky top-0 z-40 border-b border-[rgba(32,48,66,0.1)] bg-[rgba(255,255,255,0.94)] backdrop-blur-sm">
				<div
					class="pointer-events-none h-px w-full bg-[rgba(217,115,106,0.32)]"
					aria-hidden="true"
				/>
				<div class="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
					<Link
						href="/"
						class="flex items-center gap-3 no-underline"
						onClick$={() => (open.value = false)}
					>
						<span class="flex h-12 w-12 items-center justify-center">
							<SchoolFestivalLogo
								class="h-full w-full opacity-[0.9]"
								tone="ink"
								alt=""
							/>
						</span>
						<span class="min-w-0">
							<span class="block text-[0.62rem] uppercase tracking-[0.18em] text-[rgba(141,54,47,0.78)]">
								Higashi Fukuoka School Festival
							</span>
							<span class="festival-display block truncate text-[1rem] font-semibold tracking-[-0.03em] text-[rgb(32,48,66)]">
								東福岡学園祭 2026
							</span>
						</span>
					</Link>

					<nav
						class="hidden items-center gap-7 md:flex"
						aria-label="サイトナビゲーション"
					>
						{DESKTOP_NAV.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								class="text-[0.68rem] uppercase tracking-[0.16em] text-[rgba(66,84,104,0.84)] no-underline transition-colors duration-150 hover:text-[rgb(32,66,95)]"
							>
								{label}
							</Link>
						))}
					</nav>

					<button
						type="button"
						onClick$={() => (open.value = !open.value)}
						class="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-[rgba(32,48,66,0.08)] bg-white md:hidden"
						aria-label={open.value ? 'メニューを閉じる' : 'メニューを開く'}
						aria-expanded={open.value}
						aria-controls="mobile-nav"
					>
						<span
							class={[
								'block h-px w-5 bg-[rgb(32,48,66)] transition-transform duration-200',
								open.value ? 'translate-y-[6px] rotate-45' : '',
							].join(' ')}
						/>
						<span
							class={[
								'block h-px w-5 bg-[rgb(32,48,66)] transition-opacity duration-150',
								open.value ? 'opacity-0' : '',
							].join(' ')}
						/>
						<span
							class={[
								'block h-px w-5 bg-[rgb(32,48,66)] transition-transform duration-200',
								open.value ? 'translate-y-[-6px] -rotate-45' : '',
							].join(' ')}
						/>
					</button>
				</div>
			</header>

			{open.value && (
				<div
					id="mobile-nav"
					class="fixed inset-0 top-16 z-30 overflow-y-auto border-t border-[rgba(32,48,66,0.08)] bg-[rgba(255,255,255,0.98)] px-6 py-8 backdrop-blur-sm md:hidden"
				>
					{NAV_GROUPS.map((group) => (
						<div key={group.label} class="mb-8">
							<div class="mb-4 flex items-center gap-3">
								<p class="m-0 text-[0.62rem] uppercase tracking-[0.18em] text-[rgba(66,84,104,0.8)]">
									{group.label}
								</p>
							</div>
							<ul class="divide-y divide-[rgba(32,48,66,0.1)] border-y border-[rgba(32,48,66,0.1)]">
								{group.links.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											onClick$={() => (open.value = false)}
											class="block py-4 text-[0.98rem] text-[rgb(32,48,66)] no-underline transition-colors duration-150 hover:text-[rgb(32,66,95)]"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
		</>
	)
})
