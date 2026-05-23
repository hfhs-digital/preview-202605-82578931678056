import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { animate, stagger } from 'animejs'
import { SitePage } from '~/components/site-page/site-page'
import { useHomeNewsPreview } from '~/features/home/loaders'
import heroImg1 from '~/pictures/1.jpg'
import heroImg2 from '~/pictures/2.jpg'
import heroImg3 from '~/pictures/3.jpg'
import heroImg4 from '~/pictures/4.jpg'
import heroImg5 from '~/pictures/5.jpg'
import logoImg from '~/pictures/school-festival-logo.jpg'

const HERO_TITLE_MAIN = '東福岡学園祭'
const HERO_TITLE_YEAR = '2026'
const HERO_TITLE = `${HERO_TITLE_MAIN} ${HERO_TITLE_YEAR}`
const HERO_IMAGES = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5]

// ── Inline SVG icon components ───────────────────────────────────────────────

const IconCaution = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="m10.29 3.86-8 14A1 1 0 0 0 3 19.5h18a1 1 0 0 0 .71-1.64l-8-14a1 1 0 0 0-1.42 0z" />
		<path stroke-linecap="round" d="M12 9v4m0 3.5v.5" />
	</svg>
))

const IconLocation = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z" />
		<circle cx="12" cy="9" r="2" />
	</svg>
))

const IconMap = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3zm0 0v15m6-12v15" />
	</svg>
))

const IconCalendar = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" aria-hidden="true">
		<rect x="3" y="4" width="18" height="18" rx="2" stroke-linecap="round" />
		<path stroke-linecap="round" d="M8 2v4m8-4v4M3 10h18" />
	</svg>
))

const IconFamily = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path stroke-linecap="round" stroke-linejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
))

const IconHelp = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" aria-hidden="true">
		<circle cx="12" cy="12" r="9" />
		<path stroke-linecap="round" stroke-linejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m0 4v.5" />
	</svg>
))

const IconArrow = component$(() => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
	</svg>
))

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
	{ href: '/news', label: 'お知らせ', desc: '最新情報・ご案内' },
	{ href: '/timetable', label: 'タイムテーブル', desc: 'ステージ・催し物の予定' },
] as const

// ── Component ────────────────────────────────────────────────────────────────

export const ProductionHomePage = component$(() => {
	const newsData = useHomeNewsPreview()

	const orbLeftRef = useSignal<HTMLDivElement>()
	const orbRightRef = useSignal<HTMLDivElement>()

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
					.map((ch) => `<span class="hero-char" aria-hidden="true">${ch}</span>`)
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

		// ── 3. Orb breathing ────────────────────────────────────────────────────
		if (orbLeftRef.value) {
			anims.push(
				animate(orbLeftRef.value, {
					translateX: [0, 20],
					translateY: [0, 16],
					scale: [1, 1.06],
					duration: 9000,
					loop: true,
					alternate: true,
					ease: 'inOutSine',
				}),
			)
		}
		if (orbRightRef.value) {
			anims.push(
				animate(orbRightRef.value, {
					translateX: [0, -16],
					translateY: [0, 20],
					scale: [1, 1.08],
					duration: 11000,
					delay: 1500,
					loop: true,
					alternate: true,
					ease: 'inOutSine',
				}),
			)
		}

		// ── 4. Section scroll-reveal ─────────────────────────────────────────────
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

		// ── 5. Hero image carousel ────────────────────────────────────────────
		const slides = Array.from(document.querySelectorAll<HTMLElement>('.carousel-slide'))
		let carouselCurrent = 0

		const carouselTimer = setInterval(() => {
			const prev = carouselCurrent
			carouselCurrent = (carouselCurrent + 1) % slides.length
			animate(slides[prev], { opacity: [1, 0], duration: 1200, ease: 'inOutSine', persist: true })
			animate(slides[carouselCurrent], { opacity: [0, 1], duration: 1200, ease: 'inOutSine', persist: true })
		}, 5000)

		cleanup(() => {
			clearInterval(carouselTimer)
			anims.forEach((a) => a.cancel())
			observer.disconnect()
		})
	})

	return (
		<SitePage>
			{/* ── Hero ────────────────────────────────────────────────────────── */}
			<section class="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-[clamp(22px,5vw,56px)] py-28 max-[680px]:items-start max-[680px]:pb-14 pt-0">
				{/* Carousel background */}
				<div class="absolute inset-0 -z-10" aria-hidden="true">
					{HERO_IMAGES.map((src, i) => (
						<div
							key={i}
							class="carousel-slide absolute inset-0 bg-cover bg-center bg-no-repeat"
							style={{ backgroundImage: `url(${src})`, opacity: i === 0 ? '1' : '0' }}
						/>
					))}
					<div class="absolute inset-0 bg-gradient-to-b from-[rgba(247,251,255,0.55)] via-[rgba(247,251,255,0.65)] to-[rgba(247,251,255,0.97)]" />
				</div>

				{/* Glow orbs — breathing animation applied via refs */}
				<div
					ref={orbLeftRef}
					class="pointer-events-none absolute bottom-[10%] left-[-6%] h-[380px] w-[380px] rounded-full bg-[rgba(203,231,255,0.85)] blur-[32px] max-[900px]:h-[300px] max-[900px]:w-[300px] max-[420px]:h-[220px] max-[420px]:w-[220px]"
					aria-hidden="true"
				/>
				<div
					ref={orbRightRef}
					class="pointer-events-none absolute right-[-10%] top-[2%] h-[480px] w-[480px] rounded-full bg-[rgba(228,241,255,0.9)] blur-[32px] max-[900px]:h-[360px] max-[900px]:w-[360px] max-[420px]:h-[280px] max-[420px]:w-[280px]"
					aria-hidden="true"
				/>

				<div class="relative z-10 w-full max-w-[1000px] py-[clamp(18px,3vw,28px)]">
					{/* Eyebrow */}
					<p class="hero-eyebrow m-0 mb-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.12em]">
						HIGASHI FUKUOKA SCHOOL FESTIVAL 2026
					</p>

					{/* Title — chars are split client-side by useVisibleTask$ */}
					<div class="flex flex-col items-start gap-3 min-[680px]:flex-row min-[680px]:items-center min-[680px]:gap-4">
							<img
								src={logoImg}
								alt="東福岡学園祭 2026 ロゴ"
								width="96"
								height="96"
								class="hero-eyebrow h-16 w-16 shrink-0 rounded-xl object-cover shadow-sm min-[680px]:h-20 min-[680px]:w-20 min-[900px]:h-24 min-[900px]:w-24"
							/>
							<h1 class="hero-title m-0 text-[clamp(2.7rem,7.6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-festival-navy max-[680px]:text-[clamp(2.5rem,11vw,4.5rem)] max-[420px]:text-[clamp(2.2rem,13vw,3.5rem)]">
								<span class="hero-title-main whitespace-nowrap">{HERO_TITLE_MAIN}</span>
								{' '}
								<span class="hero-title-year whitespace-nowrap">{HERO_TITLE_YEAR}</span>
							</h1>
						</div>

					{/* Date + location caption row */}
					<p class="hero-meta mt-4 inline-flex flex-wrap items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft max-[680px]:mt-3.5 max-[680px]:grid max-[680px]:gap-1.5 max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.12em]">
						<span class="font-semibold">
							<time dateTime="2026-06-12T10:00:00+09:00">6月 12–13日, 2026</time>
						</span>
						<span
							class="h-px w-[18px] bg-[rgba(20,48,79,0.22)] max-[680px]:hidden"
							aria-hidden="true"
						/>
						<span>東福岡高等学校</span>
					</p>

					{/* CTA cluster */}
					<div class="hero-cta mt-8 flex flex-wrap gap-3 max-[680px]:mt-6">
						{CTA_ITEMS.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								class="rounded-full border border-festival-line bg-[rgba(255,255,255,0.55)] px-5 py-2.5 text-[0.76rem] uppercase tracking-[0.1em] text-festival-navy no-underline shadow-sm backdrop-blur-sm transition duration-150 ease-out hover:-translate-y-px hover:bg-white"
							>
								{label}
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── For Visitors ─────────────────────────────────────────────────── */}
			<section data-reveal class="border-t border-festival-line py-16 max-[680px]:py-12">
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
			<section data-reveal class="border-t border-festival-line py-16 max-[680px]:py-12">
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
								<span class="mt-4 flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.1em] text-festival-navy-soft transition-colors duration-200 group-hover:text-festival-navy">
									詳しく見る
									<IconArrow />
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── News preview ────────────────────────────────────────────────── */}
			<section data-reveal class="border-t border-festival-line py-16 max-[680px]:py-12">
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
											class="shrink-0 text-[0.68rem] uppercase tracking-[0.1em] text-festival-muted"
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
			<section data-reveal class="border-t border-festival-line py-20 max-[680px]:py-14">
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-4 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						このイベントについて
					</p>
					<h2 class="mb-6 max-w-[640px] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.05em] text-festival-navy">
						最高の青春がここにある。
					</h2>
					<p class="max-w-[640px] text-[0.96rem] leading-[1.85] text-festival-text">
						誰かが夢中になっている姿を見ると、どうしてこんなにも心が動くのだろう。<br />
						<br />
						ある者は部活動で、ある者は探究活動で、またあるものは留学や理科実験で。<br />
						それぞれが主役として、全力で紡ぐ物語が交わる場所。それが、私たちの学園祭です。<br />
						<br />
						普段は見せない真剣な眼差し、隠された才能、そして学校全体を包む圧倒的な熱気。<br />
						ここには、あなたの知らない東福岡があふれています。<br />
						<br />
						私たちの青春が放つ輝きに、ぜひ触れてみてください。<br />
						あなたの心にも、きっと熱い何かが灯るはずです。<br />
					</p>
				</div>
			</section>

			{/* ── Schedule ────────────────────────────────────────────────────── */}
			<section data-reveal class="border-t border-festival-line py-20 max-[680px]:py-14">
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="mb-8 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						スケジュール
					</p>
					<div class="grid max-w-[620px] grid-cols-2 gap-[clamp(14px,2.5vw,28px)] max-[480px]:grid-cols-1">
						{(
							[
								{
									date: '6月12日',
									day: '1日目（金）',
									note: '10:00–15:00',
									audience: '在校生・保護者のみ（要申込）',
									iso: '2026-06-12',
								},
								{
									date: '6月13日',
									day: '2日目（土）',
									note: '9:30–14:30',
									audience: '一般公開',
									iso: '2026-06-13',
								},
							] as const
						).map(({ date, day, note, audience, iso }) => (
							<div key={iso} data-reveal-card class="border-t-2 border-festival-navy pt-4">
								<time
									dateTime={iso}
									class="block text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-none tracking-[-0.07em] text-festival-navy"
								>
									{date}
								</time>
								<p class="mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-festival-navy-soft">
									{day}
								</p>
								<p class="mt-2 text-[0.72rem] tracking-[0.04em] text-festival-muted">
									{note}
								</p>
								<p class="mt-2 inline-block rounded-full bg-[rgba(20,48,79,0.06)] px-2.5 py-1 text-[0.64rem] tracking-[0.06em] text-festival-navy-soft">
									{audience}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</SitePage>
	)
})


