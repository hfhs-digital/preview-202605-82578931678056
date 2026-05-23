import { component$, useVisibleTask$ } from '@builder.io/qwik'
import { animate } from 'animejs'

type BokehCircle = {
	x: number
	y: number
	size: number
	blur: number
	bg: string
	dur: number
	delay: number
	dx: number
	dy: number
}

const CIRCLES: BokehCircle[] = [
	{ x: 7,  y: 12, size: 520, blur: 90,  bg: 'rgba(203,231,255,0.42)', dur: 13000, delay: 0,    dx: 22,  dy: 18  },
	{ x: 80, y: 8,  size: 640, blur: 110, bg: 'rgba(228,241,255,0.34)', dur: 16000, delay: 1200, dx: -18, dy: 24  },
	{ x: 46, y: 52, size: 420, blur: 72,  bg: 'rgba(214,234,255,0.30)', dur: 11000, delay: 800,  dx: 14,  dy: -16 },
	{ x: 18, y: 70, size: 480, blur: 84,  bg: 'rgba(203,231,255,0.26)', dur: 14000, delay: 400,  dx: -20, dy: 14  },
	{ x: 88, y: 58, size: 580, blur: 100, bg: 'rgba(228,241,255,0.24)', dur: 17000, delay: 2000, dx: 16,  dy: -20 },
	{ x: 62, y: 24, size: 380, blur: 66,  bg: 'rgba(203,231,255,0.34)', dur: 10000, delay: 600,  dx: -12, dy: 20  },
	{ x: 10, y: 44, size: 350, blur: 60,  bg: 'rgba(218,238,255,0.36)', dur: 12500, delay: 1600, dx: 18,  dy: 12  },
	{ x: 34, y: 84, size: 460, blur: 80,  bg: 'rgba(228,241,255,0.24)', dur: 15000, delay: 300,  dx: -14, dy: -18 },
	{ x: 72, y: 78, size: 400, blur: 70,  bg: 'rgba(203,231,255,0.28)', dur: 13500, delay: 1000, dx: 20,  dy: -12 },
	{ x: 55, y: 38, size: 700, blur: 120, bg: 'rgba(235,245,255,0.20)', dur: 9500,  delay: 2400, dx: -16, dy: 16  },
]

export const BokehLayer = component$(() => {
	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

		const els = Array.from(
			document.querySelectorAll<HTMLElement>('.bokeh-circle'),
		)
		const animations: { cancel(): void }[] = []

		els.forEach((el, i) => {
			const c = CIRCLES[i]
			if (!c) return

			// Fade in and hold
			const fadeIn = animate(el, {
				opacity: [0, 1],
				duration: 2200,
				delay: c.delay,
				ease: 'inOutSine',
				persist: true,
			})
			animations.push(fadeIn)

			// Slow ambient drift — loops forever
			const drift = animate(el, {
				translateX: [0, c.dx],
				translateY: [0, c.dy],
				scale: [1, 0.94 + (i % 4) * 0.03],
				duration: c.dur,
				delay: c.delay,
				loop: true,
				alternate: true,
				ease: 'inOutSine',
			})
			animations.push(drift)
		})

		cleanup(() => {
			animations.forEach((a) => a.cancel())
		})
	})

	return (
		<div
			class="pointer-events-none"
			style="position:fixed; inset:0; z-index:0; overflow:hidden;"
			aria-hidden="true"
		>
			{CIRCLES.map((c, i) => (
				<div
					key={i}
					class="bokeh-circle"
					style={{
						position: 'absolute',
						left: `${c.x}%`,
						top: `${c.y}%`,
						width: `${c.size}px`,
						height: `${c.size}px`,
						borderRadius: '50%',
						background: c.bg,
						filter: `blur(${c.blur}px)`,
						opacity: '0',
						transform: 'translate(-50%, -50%)',
						willChange: 'transform, opacity',
					}}
				/>
			))}
		</div>
	)
})
