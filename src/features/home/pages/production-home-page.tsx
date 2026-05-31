import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { animate, stagger } from 'animejs'
import { SectionDivider } from '~/components/section-divider/section-divider'
import { SitePage } from '~/components/site-page/site-page'
import { TitleDeco } from '~/components/title-deco/title-deco'
import { useHomeNewsPreview } from '~/features/home/loaders'
import heroImg1 from '~/pictures/1.jpg'
import heroImg2 from '~/pictures/2.jpg'
import heroImg3 from '~/pictures/3.jpg'
import heroImg4 from '~/pictures/4.jpg'
import heroImg5 from '~/pictures/5.jpg'
import volleyImg from '~/pictures/volley.jpg'
import shogiImg from '~/pictures/shogi.jpg'


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

const IconGreeting = component$(() => (
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
			d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
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

// ── Highlight items ──────────────────────────────────────────────────────────

type HighlightItem = {
	title: string
	desc: string
	/**
	 * Optional image URL for the circle motif.
	 * Pass an imported image: `image: heroImg5`
	 * When omitted a decorative placeholder is shown.
	 */
	image?: string
}

const HIGHLIGHT_ITEMS: HighlightItem[] = [
	{ title: '模擬店', desc: '各クラスによる食品販売・参加型模擬店', image: heroImg4 },
	{ title: '文化部展示', desc: '各部活動の特色を活かした展示や模擬店', image: shogiImg },
	{ title: 'センターサークル', desc: 'バンド・應援團・吹奏楽', image: heroImg1 },
	{ title: '記念講堂', desc: 'カラオケコンテスト・ダンス発表会・吹奏楽', image: heroImg2 },
	{ title: '招待試合', desc: '現役バレーボール部員とOBによるスペシャルマッチ', image: volleyImg },
	{ title: '古本市', desc: '小説・雑誌・参考書などのいろいろな本にふれあえる', image: heroImg3 },
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
	iconKey: 'caution' | 'location' | 'calendar' | 'family' | 'greeting' | 'help'
}

const VISITOR_LINKS: VisitorLink[] = [
	{ href: '/cautions', label: '来場される際の注意事項', iconKey: 'caution' },
	{ href: '/access', label: 'アクセス', iconKey: 'location' },
	{ href: '/timetable', label: 'タイムテーブル', iconKey: 'calendar' },
	{ href: '/with-children', label: 'お子様連れの方へ', iconKey: 'family' },
	{ href: '/greeting', label: 'ごあいさつ', iconKey: 'greeting' },
	{ href: '/need-help', label: 'お困りの場合', iconKey: 'help' },
]

// ── Menu items ───────────────────────────────────────────────────────────────

const MENU_ITEMS = [
	{ href: '/news', label: 'お知らせ', desc: '最新情報・ご案内' },
	{
		href: '/map',
		label: 'マップ',
		desc: '会場案内・店舗配置など',
	},
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
		const rafs: number[] = []

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

		// ── 2. Hero eyebrow rule draw-in + eyebrow/meta/CTA fade-up ─────────────
		const ruleEl =
			document.querySelector<HTMLElement>('.hero-eyebrow-rule')
		if (ruleEl) {
			ruleEl.style.transform = 'scaleX(0)'
			ruleEl.style.transformOrigin = 'left'
			ruleEl.style.transition =
				'transform 500ms cubic-bezier(0.16,0.84,0.18,0.99) 80ms'
			const rafId = requestAnimationFrame(() => {
				ruleEl.style.transform = 'scaleX(1)'
			})
			rafs.push(rafId)
		}
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

		// ── 2b. Title deco draw-in (animejs strokeDashoffset) + flow ─────────────
		const titleDecoData = [
			{ sel: '.title-deco-navy-path', delay: 820 },
			{ sel: '.title-deco-coral-path', delay: 1060 },
		]
		const titleDecoPaths: SVGPathElement[] = []

		titleDecoData.forEach(({ sel, delay }) => {
			const el = document.querySelector<SVGPathElement>(sel)
			if (!el) return
			titleDecoPaths.push(el)
			const len = el.getTotalLength()
			// Set initial hidden state as presentation attribute (lower specificity),
			// animejs then overrides via style when animation starts.
			el.setAttribute('stroke-dasharray', String(len))
			el.setAttribute('stroke-dashoffset', String(len))
			anims.push(
				animate(el, {
					strokeDashoffset: [len, 0],
					duration: 620,
					delay,
					ease: 'cubicBezier(0.4,0,0.2,1)',
					persist: true,
				}),
			)
		})

		// Gentle breathing flow after all draw-ins complete (~2000ms)
		if (titleDecoPaths.length > 0) {
			anims.push(
				animate(titleDecoPaths, {
					opacity: [1, 0.45],
					duration: 3000,
					delay: 2100,
					loop: true,
					alternate: true,
					ease: 'inOutSine',
				}),
			)
		}

		// ── 3. Section scroll-reveal ─────────────────────────────────────────────
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>('[data-reveal]'),
		)
		sections.forEach((s) => {
			s.style.opacity = '0'
			s.style.transform = 'translateY(22px)'
			s.style.willChange = 'transform, opacity'
		})

		// Pre-hide all section deco paths so they draw in on reveal
		document
			.querySelectorAll<SVGPathElement>('.section-deco-path')
			.forEach((path) => {
				const len = path.getTotalLength()
				path.setAttribute('stroke-dasharray', String(len))
				path.setAttribute('stroke-dashoffset', String(len))
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

					// Draw in any section deco line decorations in this section
					const decoPaths = Array.from(
						el.querySelectorAll<SVGPathElement>('.section-deco-path'),
					)
					decoPaths.forEach((path) => {
						const len =
							parseFloat(path.getAttribute('stroke-dasharray') ?? '0') ||
							path.getTotalLength()
						anims.push(
							animate(path, {
								strokeDashoffset: [len, 0],
								duration: 480,
								delay: 120,
								ease: 'cubicBezier(0.4,0,0.2,1)',
								persist: true,
							}),
						)
					})

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

		// ── 4. Section divider animations ────────────────────────────────────────
		const dividers = Array.from(
			document.querySelectorAll<HTMLElement>('.section-divider'),
		)
		dividers.forEach((d) => {
			d.style.opacity = '0'
		})
		const dividerObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return
					const div = entry.target as HTMLElement
					div.style.opacity = '1'
					const left =
						div.querySelector<HTMLElement>('.section-divider-left')
					const right =
						div.querySelector<HTMLElement>('.section-divider-right')
					if (left) {
						left.style.transition =
							'transform 500ms cubic-bezier(0.16,0.84,0.18,0.99) 0ms'
						requestAnimationFrame(() => {
							left.style.transform = 'scaleX(1)'
						})
					}
					if (right) {
						right.style.transition =
							'transform 500ms cubic-bezier(0.16,0.84,0.18,0.99) 100ms'
						requestAnimationFrame(() => {
							right.style.transform = 'scaleX(1)'
						})
					}
					dividerObserver.unobserve(div)
				})
			},
			{ threshold: 0.5 },
		)
		dividers.forEach((d) => dividerObserver.observe(d))

		// ── 5. Hero image carousel ────────────────────────────────────────────
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

		// ── 6. Highlights carousel ────────────────────────────────────────────
		const hlTrack =
			document.querySelector<HTMLElement>('#highlights-track')
		let hlCurrent = 0

		const goToHighlight = (idx: number) => {
			if (!hlTrack) return
			const items = Array.from(
				hlTrack.querySelectorAll<HTMLElement>('.highlights-item'),
			)
			if (items.length === 0) return
			hlCurrent = ((idx % items.length) + items.length) % items.length
			const item = items[hlCurrent]
			if (item) {
				// Use scrollTo instead of scrollIntoView to avoid page-level focus jump
				const scrollLeft =
					item.getBoundingClientRect().left -
					hlTrack.getBoundingClientRect().left +
					hlTrack.scrollLeft
				hlTrack.scrollTo({ left: scrollLeft, behavior: 'smooth' })
			}
		}

		const hlPrevClick = () => goToHighlight(hlCurrent - 1)
		const hlNextClick = () => goToHighlight(hlCurrent + 1)
		const hlPrevBtn =
			document.querySelector<HTMLElement>('.highlights-prev')
		const hlNextBtn =
			document.querySelector<HTMLElement>('.highlights-next')
		hlPrevBtn?.addEventListener('click', hlPrevClick)
		hlNextBtn?.addEventListener('click', hlNextClick)
		const hlTimer = setInterval(() => goToHighlight(hlCurrent + 1), 4000)

		// ── 7. Scroll-cue hide when hero exits viewport ───────────────────────
		const scrollCue =
			document.querySelector<HTMLElement>('.scroll-cue')
		const heroSection =
			document.querySelector<HTMLElement>('.hero-section')
		let scrollCueObserver: IntersectionObserver | undefined
		if (scrollCue && heroSection) {
			scrollCueObserver = new IntersectionObserver(
				([entry]) => {
					if (scrollCue) {
						scrollCue.style.opacity = entry.isIntersecting ? '1' : '0'
					}
				},
				{ threshold: 0.2 },
			)
			scrollCueObserver.observe(heroSection)
		}

		// ── 8. Fixed hero background — progressive blur+fade on scroll ──────────
		const heroBg =
			document.querySelector<HTMLElement>('.hero-fixed-bg')
		const onHeroScroll = () => {
			if (!heroBg) return
			const progress = Math.max(
				0,
				Math.min(1, (window.scrollY - window.innerHeight * 0.4) / (window.innerHeight * 0.85)),
			)
			heroBg.style.opacity = String(1 - progress)
			heroBg.style.filter = `blur(${progress * 18}px)`
		}
		window.addEventListener('scroll', onHeroScroll, { passive: true })

		cleanup(() => {
			if (carouselTimer) clearInterval(carouselTimer)
			clearInterval(hlTimer)
			rafs.forEach((id) => cancelAnimationFrame(id))
			anims.forEach((a) => a.cancel())
			observer.disconnect()
			dividerObserver.disconnect()
			scrollCueObserver?.disconnect()
			hlPrevBtn?.removeEventListener('click', hlPrevClick)
			hlNextBtn?.removeEventListener('click', hlNextClick)
			window.removeEventListener('scroll', onHeroScroll)
		})
	})

	return (
		<SitePage>
			{/* ── Fixed hero background glows ─────────────────────────────────── */}
			{/* Stays in place as the page scrolls; fades+blurs away via JS         */}
			{/* after the hero scrolls out of view.                                 */}
			<div
				class="hero-fixed-bg pointer-events-none"
				style={{ position: 'fixed', inset: '0', zIndex: '0' }}
				aria-hidden="true"
			>
				{/* Coral glow — top-right */}
				<div
					style={{
						position: 'absolute',
						right: '-8%',
						top: '-12%',
						width: '640px',
						height: '640px',
						borderRadius: '50%',
						backgroundImage:
							'radial-gradient(circle at 38% 38%, rgba(217,115,106,0.14) 0%, rgba(217,115,106,0.07) 30%, rgba(255,255,255,0) 68%)',
					}}
				/>
				{/* Navy glow — bottom-left */}
				<div
					style={{
						position: 'absolute',
						bottom: '-10%',
						left: '-8%',
						width: '520px',
						height: '520px',
						borderRadius: '50%',
						backgroundImage:
							'radial-gradient(circle at 62% 62%, rgba(32,66,95,0.10) 0%, rgba(32,66,95,0.05) 36%, rgba(255,255,255,0) 68%)',
					}}
				/>
				{/* Cyan accent — upper-left */}
				<div
					style={{
						position: 'absolute',
						left: '-6%',
						top: '-8%',
						width: '480px',
						height: '480px',
						borderRadius: '50%',
						backgroundImage:
							'radial-gradient(circle at 50% 50%, rgba(150,212,220,0.11) 0%, rgba(150,212,220,0.04) 42%, rgba(255,255,255,0) 70%)',
					}}
				/>
				{/* Blue accent — bottom-right */}
				<div
					style={{
						position: 'absolute',
						right: '-6%',
						bottom: '-8%',
						width: '440px',
						height: '440px',
						borderRadius: '50%',
						backgroundImage:
							'radial-gradient(circle at 50% 50%, rgba(185,205,228,0.12) 0%, rgba(185,205,228,0.05) 40%, rgba(255,255,255,0) 70%)',
					}}
				/>
			</div>

			{/* ── Hero ────────────────────────────────────────────────────────── */}
			<section class="hero-section washi-grain relative isolate overflow-hidden px-[clamp(22px,5vw,56px)] pb-24 pt-8 max-[680px]:pb-14">

				<div class="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-[1120px] items-center gap-14 pb-[clamp(28px,6vw,56px)] min-[980px]:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)]">
					<div class="relative max-w-152 overflow-visible">

						<div class="hero-eyebrow flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(66,84,104,0.86)] max-[520px]:gap-3 max-[420px]:text-[0.62rem]">
							<span>Higashi Fukuoka School Festival 2026</span>
							<span
								class="hero-eyebrow-rule h-px flex-1 bg-[rgba(32,66,95,0.16)] max-[520px]:max-w-[72px] sm:max-w-[128px]"
								aria-hidden="true"
							/>
						</div>

						<div class="relative mt-8 overflow-visible">
							<TitleDeco />
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
								カメラロール
							</span>
						</div>
					</div>
				</div>

				{/* Scroll cue — animated chevrons, hidden when hero scrolls away */}
				<div
					class="scroll-cue pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-[5px] transition-opacity duration-500"
					aria-hidden="true"
				>
					<svg class="scroll-cue-1" viewBox="0 0 12 8" width="12" height="8" fill="none">
						<path d="M1 1l5 5 5-5" stroke="rgba(32,66,95,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg class="scroll-cue-2" viewBox="0 0 12 8" width="12" height="8" fill="none">
						<path d="M1 1l5 5 5-5" stroke="rgba(32,66,95,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg class="scroll-cue-3" viewBox="0 0 12 8" width="12" height="8" fill="none">
						<path d="M1 1l5 5 5-5" stroke="rgba(32,66,95,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</section>

			<SectionDivider />

			{/* ── For Visitors ─────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="relative mb-10 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
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
									{iconKey === 'calendar' && <IconCalendar />}
									{iconKey === 'family' && <IconFamily />}
									{iconKey === 'greeting' && <IconGreeting />}
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

			<SectionDivider />

			{/* ── Menu ──────────────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="relative mb-10 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						メニュー
					</p>

					{/* Mobile: horizontal snap-scroll. sm+: 3-column grid */}
					<div class="flex snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-3 sm:overflow-visible scrollbar-none">
						{MENU_ITEMS.map(({ href, label, desc }) => (
							<Link
								key={href}
								href={href}
								data-reveal-card
								class="group flex shrink-0 snap-start flex-col justify-between rounded-[6px] border border-festival-line bg-[rgba(255,255,255,0.55)] p-6 no-underline backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm w-full sm:w-auto"
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

			<SectionDivider />

			{/* ── Highlights ──────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="relative mb-10 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						ハイライト
					</p>

					<div class="relative">
						{/* Prev/Next buttons */}
						<button
							class="highlights-prev absolute -left-5 top-[72px] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(217,115,106,0.35)] bg-white/90 text-[#d9736a] shadow-sm transition-all duration-150 hover:border-[rgba(217,115,106,0.7)] hover:bg-white max-[700px]:hidden"
							type="button"
							aria-label="前へ"
						>
							<svg viewBox="0 0 14 14" width="12" height="12" fill="none">
								<path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</button>
						<button
							class="highlights-next absolute -right-5 top-[72px] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(217,115,106,0.35)] bg-white/90 text-[#d9736a] shadow-sm transition-all duration-150 hover:border-[rgba(217,115,106,0.7)] hover:bg-white max-[700px]:hidden"
							type="button"
							aria-label="次へ"
						>
							<svg viewBox="0 0 14 14" width="12" height="12" fill="none">
								<path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</button>

						{/* Scrollable track */}
						<div
							id="highlights-track"
							class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-none"
						>
							{HIGHLIGHT_ITEMS.map(({ title, desc, image }) => (
								<div
									key={title}
									data-reveal-card
									class="highlights-item flex shrink-0 snap-start flex-col items-center gap-4 w-full sm:w-[calc(50%_-_10px)] lg:w-[calc(33.333%_-_14px)]"
								>
									{/* Circle motif */}
									<div
										class="group flex h-40 w-40 items-center justify-center rounded-full border border-[rgba(217,115,106,0.35)] bg-[rgba(255,255,255,0.75)] transition-all duration-200 hover:border-[rgba(32,66,95,0.5)] hover:shadow-[0_6px_24px_rgba(217,115,106,0.12)] overflow-hidden"
									>
										{image ? (
											<img
												src={image}
												alt={title}
												class="h-full w-full rounded-full object-cover"
												width="160"
												height="160"
											/>
										) : (
											<span
												class="block h-16 w-16 rounded-full"
												aria-hidden="true"
												style={{ background: 'radial-gradient(circle at 38% 38%, rgba(217,115,106,0.22) 0%, rgba(32,66,95,0.10) 70%, transparent 100%)' }}
											/>
										)}
									</div>
									<div class="text-center">
										<p class="text-[0.92rem] font-semibold leading-snug tracking-[-0.02em] text-festival-navy">
											{title}
										</p>
										<p class="mt-1 text-[0.74rem] leading-[1.6] text-festival-muted">
											{desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<SectionDivider />

			{/* ── News preview ────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="py-16 max-[680px]:py-12"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<div class="mb-10 flex items-center justify-between gap-4">
						<p class="relative text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
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

			<SectionDivider />

			{/* ── About ───────────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="py-20 max-[680px]:py-14"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="relative mb-6 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
						学園祭について
					</p>
					<h2 class="mb-6 max-w-[640px] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tighter text-festival-navy">
						東煌澄輝
					</h2>
					<p class="max-w-[640px] text-[0.96rem] leading-[1.85] text-festival-text">
						今年の学園祭スローガンは「東煌澄輝」です。
						<br />
						<br />
						東煌:東福岡の生徒ひとりひとりが、日々の学校生活の中で積み重ねている努力の煌めき。
						<br />
						澄輝:学園祭という最高の舞台で、生徒全員が一点の曇りなく輝けること。
						<br />
						<br />
						全員が主役となって輝く特別な日。
						<br />
						圧倒的な熱気に包まれる東の学園祭を、ぜひお楽しみください。
						<br />
					</p>
				</div>
			</section>

			<SectionDivider />

			{/* ── Schedule ────────────────────────────────────────────────────── */}
			<section
				data-reveal
				class="py-20 max-[680px]:py-14"
			>
				<div class="mx-auto max-w-[1000px] px-6">
					<p class="relative mb-10 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft">
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
