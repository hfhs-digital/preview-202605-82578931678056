import { component$, useSignal } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import logoImg from '~/pictures/school-festival-logo.jpg'

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
			<header class="sticky top-0 z-40 border-b border-festival-line bg-[rgba(247,251,255,0.92)] backdrop-blur-sm">
				<div class="mx-auto flex h-14 max-w-[1000px] items-center justify-between px-6">
				{/* Logo / event name */}
				<Link
					href="/" 
					class="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-festival-navy no-underline transition-colors duration-150 hover:text-festival-navy-soft"
					onClick$={() => (open.value = false)}
				>
					{/* Festival logo */}
					<img
							src={logoImg}
							alt="東福岡学園祭 2026 ロゴ"
							width="28"
							height="28"
							class="h-7 w-7 shrink-0 rounded object-cover"
						/>
					東福岡学園祭 2026
				</Link>

					{/* Desktop navigation */}
					<nav class="hidden items-center gap-6 md:flex" aria-label="サイトナビゲーション">
						{DESKTOP_NAV.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								class="text-[0.72rem] uppercase tracking-[0.12em] text-festival-muted no-underline transition-colors duration-150 hover:text-festival-navy"
							>
								{label}
							</Link>
						))}
					</nav>

					{/* Hamburger button — mobile only */}
					<button
						type="button"
						onClick$={() => (open.value = !open.value)}
						class="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
						aria-label={open.value ? 'メニューを閉じる' : 'メニューを開く'}
						aria-expanded={open.value}
						aria-controls="mobile-nav"
					>
						<span
							class={[
								'block h-px w-5 bg-festival-navy transition-transform duration-200',
								open.value ? 'translate-y-[7px] rotate-45' : '',
							].join(' ')}
						/>
						<span
							class={[
								'block h-px w-5 bg-festival-navy transition-opacity duration-150',
								open.value ? 'opacity-0' : '',
							].join(' ')}
						/>
						<span
							class={[
								'block h-px w-5 bg-festival-navy transition-transform duration-200',
								open.value ? '-translate-y-[7px] -rotate-45' : '',
							].join(' ')}
						/>
					</button>
				</div>
			</header>

			{/* Mobile navigation overlay */}
			{open.value && (
				<div
					id="mobile-nav"
					class="fixed inset-0 top-14 z-30 overflow-y-auto bg-[rgba(247,251,255,0.98)] px-6 py-8 backdrop-blur-sm md:hidden"
				>
					{NAV_GROUPS.map((group) => (
						<div key={group.label} class="mb-8">
							<p class="mb-3 text-[0.64rem] uppercase tracking-[0.16em] text-festival-muted">
								{group.label}
							</p>
							<ul class="divide-y divide-festival-line">
								{group.links.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											onClick$={() => (open.value = false)}
											class="block py-3.5 text-[0.96rem] text-festival-navy no-underline transition-colors duration-150 hover:text-festival-navy-soft"
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

