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
	// ── Navy cluster (left-bottom) ────────────────────────────────────────────
	{
		x: -10,
		y: 64,
		size: 520,
		blur: 90,
		bg: 'rgba(96,150,186,0.12)',
		dur: 13000,
		delay: 0,
		dx: 22,
		dy: 18,
	},
	{
		x: 5,
		y: 40,
		size: 420,
		blur: 72,
		bg: 'rgba(96,150,186,0.10)',
		dur: 11000,
		delay: 800,
		dx: 14,
		dy: -16,
	},
	{
		x: 12,
		y: 90,
		size: 400,
		blur: 70,
		bg: 'rgba(96,150,186,0.09)',
		dur: 13500,
		delay: 1000,
		dx: 20,
		dy: -12,
	},
	// ── Coral cluster (right-top) ─────────────────────────────────────────────
	{
		x: 82,
		y: 14,
		size: 480,
		blur: 84,
		bg: 'rgba(234,167,178,0.12)',
		dur: 14000,
		delay: 400,
		dx: -20,
		dy: 14,
	},
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
