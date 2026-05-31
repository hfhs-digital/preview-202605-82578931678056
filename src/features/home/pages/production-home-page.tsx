import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { animate, stagger } from 'animejs'
import { SitePage } from '~/components/site-page/site-page'
// import { SchoolFestivalLogo } from '~/components/school-festival-logo/school-festival-logo'
import { useHomeNewsPreview } from '~/features/home/loaders'
import heroImg1 from '~/pictures/1.jpg'
import heroImg2 from '~/pictures/2.jpg'
import heroImg3 from '~/pictures/3.jpg'
import heroImg4 from '~/pictures/4.jpg'
import heroImg5 from '~/pictures/5.jpg'

const HERO_TITLE_MAIN = '東福岡学園祭'
const HERO_TITLE_YEAR = '2026'
const HERO_TITLE = `${HERO_TITLE_MAIN} ${HERO_TITLE_YEAR}`
const HERO_IMAGES = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5]

// ── Inline SVG icon components ───────────────────────────────────────────────

const IconCaution = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m10.29 3.86-8 14A1 1 0 0 0 3 19.5h18a1 1 0 0 0 .71-1.64l-8-14a1 1 0 0 0-1.42 0z"
		/>
		<path stroke-linecap="round" d="M12 9v4m0 3.5v.5" />
	</svg>
))

const IconLocation = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z"
		/>
		<circle cx="12" cy="9" r="2" />
	</svg>
))

const IconMap = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3zm0 0v15m6-12v15"
		/>
	</svg>
))

const IconCalendar = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<rect x="3" y="4" width="18" height="18" rx="2" stroke-linecap="round" />
		<path stroke-linecap="round" d="M8 2v4m8-4v4M3 10h18" />
	</svg>
))

const IconFamily = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
		/>
		<circle cx="9" cy="7" r="4" />
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
		/>
	</svg>
))

const IconHelp = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="9" />
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m0 4v.5"
		/>
	</svg>
))

const IconArrow = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="14"
		height="14"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M5 12h14m-5-5 5 5-5 5"
		/>
	</svg>
))

const IconImage = component$(() => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		width="28"
		height="28"
		aria-hidden="true"
	>
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m3 15 5-5 4 4 3-3 6 6"
		/>
		<circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
	</svg>
))

// ── Highlight items ──────────────────────────────────────────────────────────

type HighlightItem = {
	title: string
	desc: string
	// Replace `src` with the actual import (e.g. `import highlight1 from '~/pictures/highlight1.jpg'`)
	// and pass it here when the photo is ready. Leave as `null` to show the placeholder.
	src: string | null
}

const HIGHLIGHT_ITEMS: HighlightItem[] = [
	{ title: '文化発表', desc: 'クラス・部活動による展示・舞台発表', src: null },
	{ title: 'ステージ', desc: 'ダンス・バンド・パフォーマンス', src: null },
	{ title: '食品販売', desc: '各クラスの模擬店・グルメ屋台', src: null },
	{ title: '理科・探究展示', desc: '生徒の研究成果を展示', src: null },
	{ title: '国際交流', desc: '留学体験・海外姉妹校との交流', src: null },
	{ title: 'スポーツ', desc: '体育館・グラウンドで繰り広げる熱戦', src: null },
]

// ── CTA items ────────────────────────────────────────────────────────────────

type CtaLink = {
	href: string
	label: string
}

const CTA_ITEMS: CtaLink[] = [
	{ href: '/news/', label: 'お知らせ' },
	{ href: '/timetable/', label: 'タイムテーブル' },
	{ href: '/map/', label: 'マップ' },
]

// ── Visitor links data ───────────────────────────────────────────────────────

type VisitorLink = {
	href: string
	label: string
	iconKey: 'caution' | 'location' | 'map' | 'calendar' | 'family' | 'help'
}

const VISITOR_LINKS: VisitorLink[] = [
	{ href: '/cautions', label: '来場される際の注意事項', iconKey: 'caution' },
	{ href: '/access', label: 'アクセス', iconKey: 'location' },
	{ href: '/map', label: '校内マップ', iconKey: 'map' },
	{ href: '/timetable', label: 'タイムテーブル', iconKey: 'calendar' },
	{ href: '/with-children', label: 'お子様連れの方へ', iconKey: 'family' },
	{ href: '/need-help', label: 'お困りの場合', iconKey: 'help' },
]

// ── Menu items ───────────────────────────────────────────────────────────────

const MENU_ITEMS = [
	{
		href: '/greeting',
		label: 'ごあいさつ',
		desc: '学校長・学園祭委員会・生徒会長より',
	},
	{ href: '/news', label: 'お知らせ', desc: '最新情報・ご案内' },
	{
		href: '/timetable',
		label: 'タイムテーブル',
		desc: 'ステージ・催し物の予定',
	},
] as const

// ── Component ────────────────────────────────────────────────────────────────

export const ProductionHomePage = component$(() => {
	const newsData = useHomeNewsPreview()

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		const reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches
		if (reduced) return

		const anims: { cancel(): void }[] = []

		// ── 1. Hero title character stagger reveal ──────────────────────────────
		const titleEl = document.querySelector<HTMLHeadingElement>('.hero-title')
		const mainEl = titleEl?.querySelector<HTMLSpanElement>('.hero-title-main')
		const yearEl = titleEl?.querySelector<HTMLSpanElement>('.hero-title-year')
		if (titleEl && mainEl && yearEl) {
			titleEl.setAttribute('aria-label', HERO_TITLE)
			const toChars = (text: string) =>
				[...text]
					.map(
						(ch) => `<span class="hero-char" aria-hidden="true">${ch}</span>`,
					)
					.join('')
			mainEl.innerHTML = toChars(HERO_TITLE_MAIN)
			yearEl.innerHTML = toChars(HERO_TITLE_YEAR)

			anims.push(
				animate('.hero-char', {
					opacity: [0, 1],
					translateY: ['0.18em', '0em'],
					duration: 620,
					delay: stagger(42, { start: 280 }),
					ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
					persist: true,
				}),
			)
		}

		// ── 2. Hero eyebrow + meta + CTA fade-up ────────────────────────────────
		anims.push(
			animate('.hero-eyebrow', {
				opacity: [0, 1],
				translateY: ['10px', '0px'],
				duration: 500,
				delay: 120,
				ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
				persist: true,
			}),
		)
		anims.push(
			animate('.hero-meta', {
				opacity: [0, 1],
				translateY: ['8px', '0px'],
				duration: 480,
				delay: 760,
				ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
				persist: true,
			}),
		)
		anims.push(
			animate('.hero-cta', {
				opacity: [0, 1],
				scale: [0.96, 1],
				duration: 400,
				delay: 980,
				ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
				persist: true,
			}),
		)

		// ── 3. Section scroll-reveal ─────────────────────────────────────────────
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>('[data-reveal]'),
		)
		sections.forEach((s) => {
			s.style.opacity = '0'
			s.style.transform = 'translateY(22px)'
			s.style.willChange = 'transform, opacity'
		})

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return
					const el = entry.target as HTMLElement
					el.style.willChange = 'auto'

					anims.push(
						animate(el, {
							opacity: [0, 1],
							translateY: ['22px', '0px'],
							duration: 580,
							ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
							persist: true,
						}),
					)

					const cards = Array.from(
						el.querySelectorAll<HTMLElement>('[data-reveal-card]'),
					)
					if (cards.length > 0) {
						anims.push(
							animate(cards, {
								opacity: [0, 1],
								translateY: ['14px', '0px'],
								duration: 480,
								delay: stagger(55, { start: 60 }),
								ease: 'cubicBezier(0.16, 0.84, 0.18, 0.99)',
								persist: true,
							}),
						)
					}

					observer.unobserve(el)
				})
			},
			{ threshold: 0.08 },
		)
		sections.forEach((s) => observer.observe(s))

		// ── 4. Hero image carousel ────────────────────────────────────────────
		const slides = Array.from(
			document.querySelectorAll<HTMLElement>('.carousel-slide'),
		)
		let carouselCurrent = 0

		const carouselTimer =
			slides.length > 1
				? setInterval(() => {
					const prev = carouselCurrent
					carouselCurrent = (carouselCurrent + 1) % slides.length
					animate(slides[prev], {
						opacity: [1, 0],
						duration: 1200,
						ease: 'inOutSine',
						persist: true,
					})
					animate(slides[carouselCurrent], {
						opacity: [0, 1],
						duration: 1200,
						ease: 'inOutSine',
						persist: true,
					})
				}, 5000)
				: undefined

		cleanup(() => {
			if (carouselTimer) clearInterval(carouselTimer)
			anims.forEach((a) => a.cancel())
			observer.disconnect()
		})
	})

	return (
		<SitePage>
			{/* ── Hero ────────────────────────────────────────────────────────── */}
			<section class="relative isolate overflow-hidden px-[clamp(22px,5vw,56px)] pb-24 pt-8 max-[680px]:pb-14">
				<div class="absolute inset-0 -z-20 bg-white" aria-hidden="true" />
				<div
					class="pointer-events-none absolute right-[-12%] top-[-10%] -z-10 h-[560px] w-[560px] rounded-full max-[900px]:h-[420px] max-[900px]:w-[420px] max-[520px]:right-[-30%] max-[520px]:top-[-18%] max-[520px]:h-[320px] max-[520px]:w-[320px]"
					aria-hidden="true"
					style={{
						backgroundImage:
							'radial-gradient(circle at 38% 38%, rgba(217,115,106,0.18) 0%, rgba(217,115,106,0.1) 28%, rgba(32,66,95,0.06) 48%, rgba(255,255,255,0) 74%)',
					}}
				/>

				<div class="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-[1120px] items-center gap-14 pb-[clamp(28px,6vw,56px)] min-[980px]:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)]">
					<div class="relative max-w-152">

						<div class="hero-eyebrow flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(66,84,104,0.86)] max-[520px]:gap-3 max-[420px]:text-[0.62rem]">
							<span>Higashi Fukuoka School Festival 2026</span>
							<span
								class="h-px flex-1 bg-[rgba(32,66,95,0.16)] max-[520px]:max-w-[72px] sm:max-w-[128px]"
								aria-hidden="true"
							/>
						</div>

						<div class="mt-8">
							<h1 class="hero-title m-0 text-[clamp(3.05rem,7.2vw,6rem)] font-semibold leading-[0.91] tracking-[-0.08em] text-[rgb(32,48,66)] max-[680px]:text-[clamp(2.6rem,11vw,4.8rem)] max-[420px]:text-[clamp(2.3rem,13vw,3.8rem)]">
								<span class="hero-title-main whitespace-nowrap">
									{HERO_TITLE_MAIN}
								</span>{' '}
								<span class="hero-title-year whitespace-nowrap text-[rgba(32,66,95,0.9)]">
									{HERO_TITLE_YEAR}
								</span>
							</h1>
							<div
								class="mt-5 h-px w-full max-w-76 bg-[rgba(32,66,95,0.16)]"
								aria-hidden="true"
							/>
						</div>

						<div class="hero-meta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8rem] text-[rgb(32,48,66)] max-[520px]:gap-x-4">
							<div class="inline-flex items-center gap-3">
								<span
									class="hidden h-px w-8 bg-[rgba(32,66,95,0.16)] sm:block"
									aria-hidden="true"
								/>
								<time
									dateTime="2026-06-12T10:00:00+09:00"
									class="font-medium tracking-[0.04em]"
								>
									2026年 6月 12–13日
								</time>
							</div>
							<span
								class="h-4 w-px bg-[rgba(32,66,95,0.12)] max-[520px]:hidden"
								aria-hidden="true"
							/>
							<p class="m-0 tracking-[0.04em]">東福岡高等学校</p>
						</div>

						<div class="hero-cta mt-9 flex flex-wrap gap-3 max-[680px]:mt-7">
							{CTA_ITEMS.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									class="group border border-[rgba(32,66,95,0.14)] bg-white px-5 py-3 text-[0.74rem] uppercase tracking-[0.12em] text-[rgb(32,48,66)] no-underline shadow-[0_10px_26px_rgba(32,48,66,0.04)] transition duration-200 ease-out hover:-translate-y-px hover:border-[rgba(141,54,47,0.24)] hover:text-[rgb(32,66,95)]"
								>
									<span class="flex items-center gap-2">
										{label}
										<span class="text-[rgba(112,128,149,0.9)] transition-transform duration-200 group-hover:translate-x-0.5">
											→
										</span>
									</span>
								</Link>
							))}
						</div>
					</div>

					<div class="relative mx-auto w-full max-w-[500px]">
						<div class="relative overflow-hidden border border-[rgba(32,66,95,0.12)] bg-white p-4 shadow-[0_24px_60px_rgba(32,48,66,0.07)]">
							<div class="relative aspect-4/5 overflow-hidden bg-[rgba(250,250,248,1)]">
								{HERO_IMAGES.map((src, i) => (
									<div
										key={i}
										class="carousel-slide absolute inset-0 bg-cover bg-center bg-no-repeat"
										style={{
											backgroundImage: `url(${src})`,
											opacity: i === 0 ? '1' : '0',
										}}
									/>
								))}

								<div
									class="absolute inset-0"
									aria-hidden="true"
									style={{
										backgroundImage:
											'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.52) 100%)',
									}}
								/>
							</div>
						</div>

						<div class="mt-4 flex items-center justify-between gap-4 text-[0.64rem] uppercase tracking-[0.14em] text-[rgba(66,84,104,0.82)] max-[520px]:flex-col max-[520px]:items-start">
							<span class="inline-flex items-center gap-3">
								<span
									class="h-px w-10 bg-[rgba(32,66,95,0.18)]"
									aria-hidden="true"
								/>
								Main visual
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* ── For Visitors ─────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="border-t border-festival-line py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-8 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						ご来場の皆様へ
					</p>

					{/* Two-column icon-row list */}
					<div class="grid grid-cols-1 sm:grid-cols-2">
						{VISITOR_LINKS.map(({ href, label, iconKey }) => (
							<Link
								key={href}
								href={href}
								data-reveal-card
								class="group flex items-center gap-4 border-b border-festival-line py-4 no-underline transition-all duration-200 hover:translate-x-1 sm:odd:pr-8"
							>
								{/* Icon badge */}
								<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-festival-line bg-[rgba(255,255,255,0.7)] text-festival-navy-soft transition-colors duration-200 group-hover:border-festival-navy-soft group-hover:text-festival-navy">
									{iconKey === 'caution' && <IconCaution />}
									{iconKey === 'location' && <IconLocation />}
									{iconKey === 'map' && <IconMap />}
									{iconKey === 'calendar' && <IconCalendar />}
									{iconKey === 'family' && <IconFamily />}
									{iconKey === 'help' && <IconHelp />}
								</span>

								{/* Labels */}
								<span class="flex-1 min-w-0">
									<span class="block text-[0.84rem] font-medium leading-snug text-festival-navy">
										{label}
									</span>
								</span>

								{/* Arrow */}
								<span class="shrink-0 text-festival-line transition-colors duration-200 group-hover:text-festival-muted">
									<IconArrow />
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── Menu (replaces Highlights) ──────────────────────────────────── */}
			<section
				data-reveal
				class="border-t border-festival-line py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-8 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						メニュー
					</p>

					<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
						{MENU_ITEMS.map(({ href, label, desc }) => (
							<Link
								key={href}
								href={href}
								data-reveal-card
								class="group flex flex-col justify-between rounded-[6px] border border-festival-line bg-[rgba(255,255,255,0.55)] p-6 no-underline backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
							>
								<div>
									<p class="text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-festival-navy">
										{label}
									</p>
									<p class="mt-1.5 text-[0.76rem] leading-[1.6] text-festival-muted">
										{desc}
									</p>
								</div>
								<span class="mt-4 flex items-center gap-1 text-[0.68rem] uppercase tracking-widest text-festival-navy-soft transition-colors duration-200 group-hover:text-festival-navy">
									詳しく見る
									<IconArrow />
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── Highlights ──────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="border-t border-festival-line py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-8 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						ハイライト
					</p>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{HIGHLIGHT_ITEMS.map(({ title, desc, src }) => (
							<div
								key={title}
								data-reveal-card
								class="group flex flex-col border border-festival-line bg-[rgba(255,255,255,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
							>
								{/* Photo slot — replace `src={null}` with an imported image to activate */}
								{src ? (
									<img
										src={src}
										alt={title}
										width="400"
										height="300"
										class="aspect-4/3 w-full object-cover"
									/>
								) : (
									<div
										class="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 border-b border-festival-line bg-[rgba(203,231,255,0.22)]"
										aria-label={`${title} — 写真準備中`}
									>
										<span class="text-[rgba(20,48,79,0.25)]">
											<IconImage />
										</span>
										<span class="text-[0.62rem] uppercase tracking-widest text-[rgba(20,48,79,0.3)]">
											写真準備中
										</span>
									</div>
								)}

								{/* Card body */}
								<div class="p-5">
									<p class="text-[0.96rem] font-semibold leading-snug tracking-[-0.02em] text-festival-navy">
										{title}
									</p>
									<p class="mt-1.5 text-[0.76rem] leading-[1.6] text-festival-muted">
										{desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── News preview ────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="border-t border-festival-line py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<div class="mb-8 flex items-baseline justify-between gap-4">
						<p class="text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
							お知らせ
						</p>
						<Link
							href="/news/"
							class="text-[0.72rem] uppercase tracking-[0.12em] text-festival-muted no-underline transition-colors duration-150 hover:text-festival-navy"
						>
							すべて見る →
						</Link>
					</div>

					{newsData.value && newsData.value.contents.length > 0 ? (
						<ul class="divide-y divide-festival-line">
							{newsData.value.contents.map((item) => (
								<li key={item.id} class="py-4">
									<Link
										href={`/news/${item.id}`}
										class="group flex items-baseline gap-5 no-underline max-[520px]:flex-col max-[520px]:gap-1"
									>
										<time
											dateTime={item.publishedAt}
											class="shrink-0 text-[0.68rem] uppercase tracking-widest text-festival-muted"
										>
											{new Date(item.publishedAt).toLocaleDateString('ja-JP', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
											})}
										</time>
										<span class="text-[0.96rem] text-festival-text transition-colors duration-150 group-hover:text-festival-navy">
											{item.title}
										</span>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p class="text-[0.88rem] text-festival-muted">
							お知らせはまだありません。
						</p>
					)}
				</div>
			</section>

			{/* ── About ───────────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="border-t border-festival-line py-20 max-[680px]:py-14"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-4 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						このイベントについて
					</p>
					<h2 class="mb-6 max-w-[640px] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tighter text-festival-navy">
						最高の青春がここにある。
					</h2>
					<p class="max-w-[640px] text-[0.96rem] leading-[1.85] text-festival-text">
						誰かが夢中になっている姿を見ると、どうしてこんなにも心が動くのだろう。
						<br />
						<br />
						ある者は部活動で、ある者は探究活動で、またあるものは留学や理科実験で。
						<br />
						それぞれが主役として、全力で紡ぐ物語が交わる場所。それが、私たちの学園祭です。
						<br />
						<br />
						普段は見せない真剣な眼差し、隠された才能、そして学校全体を包む圧倒的な熱気。
						<br />
						ここには、あなたの知らない東福岡があふれています。
						<br />
						<br />
						私たちの青春が放つ輝きに、ぜひ触れてみてください。
						<br />
						あなたの心にも、きっと熱い何かが灯るはずです。
						<br />
					</p>
				</div>
			</section>

			{/* ── Schedule ────────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="border-t border-festival-line py-20 max-[680px]:py-14"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-8 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						スケジュール
					</p>
					<div class="grid max-w-[620px] grid-cols-2 gap-[clamp(14px,2.5vw,28px)] max-[480px]:grid-cols-1">
						{(
							[
								{
									date: '6月12日（金）',
									day: '1日目',
									note: '10:00–15:00',
									audience: '在校生・保護者のみ（要申込）',
									iso: '2026-06-12',
								},
								{
									date: '6月13日（土）',
									day: '2日目',
									note: '9:30–14:30',
									audience: '一般公開',
									iso: '2026-06-13',
								},
							] as const
						).map(({ date, day, note, audience, iso }) => (
							<section
								key={iso}
								data-reveal-card
								class="border border-festival-line bg-white p-6 shadow-[0_10px_28px_rgba(32,48,66,0.04)]"
							>
								<p class="mb-2 text-[0.64rem] uppercase tracking-[0.16em] text-[rgba(66,84,104,0.82)]">
									{day}
								</p>
								<time
									dateTime={iso}
									class="festival-display block text-[1.7rem] font-semibold tracking-tighter text-[rgb(32,48,66)]"
								>
									{date}
								</time>
								<p class="mt-2 text-[0.72rem] tracking-[0.04em] text-festival-muted">
									{note}
								</p>
								<p class="mt-3 inline-block border border-[rgba(32,48,66,0.1)] px-3 py-1 text-[0.64rem] uppercase tracking-[0.14em] text-[rgba(141,54,47,0.88)]">
									{audience}
								</p>
							</section>
						))}
					</div>
				</div>
			</section>
		</SitePage>
	)
})
