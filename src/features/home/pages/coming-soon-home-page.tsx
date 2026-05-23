import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { FestivalShell } from '~/components/festival-shell/festival-shell'

const TARGET_DATE = new Date('2026-06-12T10:00:00+09:00').getTime()

const getCountdown = (now = Date.now()) => {
	const diff = Math.max(TARGET_DATE - now, 0)
	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
	const minutes = Math.floor((diff / (1000 * 60)) % 60)
	const seconds = Math.floor((diff / 1000) % 60)

	return {
		isLive: diff === 0,
		segments: [
			{ label: 'Days', value: String(days).padStart(2, '0') },
			{ label: 'Hours', value: String(hours).padStart(2, '0') },
			{ label: 'Minutes', value: String(minutes).padStart(2, '0') },
			{ label: 'Seconds', value: String(seconds).padStart(2, '0') },
		],
	}
}

export const ComingSoonHomePage = component$(() => {
	const countdown = useSignal(getCountdown())

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		let timer: number | undefined

		const tick = () => {
			countdown.value = getCountdown()

			if (!countdown.value.isLive) {
				timer = window.setTimeout(tick, 1000)
			}
		}

		timer = window.setTimeout(tick, 1000)

		cleanup(() => {
			if (timer) {
				window.clearTimeout(timer)
			}
		})
	})

	return (
		<FestivalShell>
			<p class="m-0 mb-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.12em]">
				HFHS SCHOOL FESTIVAL 2026
			</p>
			<h1 class="m-0 flex items-center gap-[clamp(8px,1.8vw,14px)] text-[clamp(2.7rem,7.6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.08em] max-[680px]:text-[clamp(2.5rem,11vw,4rem)] max-[420px]:text-[clamp(2.15rem,12vw,3.2rem)]">
				東福岡学園祭 2026
			</h1>
			<p class="mt-4 inline-flex flex-wrap items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft max-[680px]:mt-3.5 max-[680px]:grid max-[680px]:gap-1.5 max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.12em]">
				<span>Coming Soon</span>
				<span
					class="h-px w-[18px] bg-[rgba(20,48,79,0.22)] max-[680px]:hidden"
					aria-hidden="true"
				/>
				<span class="font-semibold">
					<time dateTime="2026-06-12T10:00:00+09:00">Jun 12 - 13, 2026</time>
				</span>
			</p>

			<div
				class="mt-[clamp(24px,4vw,36px)] grid w-full max-w-[620px] grid-cols-4 gap-[clamp(14px,2vw,22px)] border-t border-festival-line pt-[18px] max-[680px]:mt-[22px] max-[680px]:max-w-[360px] max-[680px]:grid-cols-2 max-[680px]:gap-x-[14px] max-[680px]:gap-y-4 max-[680px]:pt-4 max-[420px]:max-w-full max-[420px]:gap-x-3 max-[420px]:gap-y-3.5"
				aria-label="Countdown until launch"
			>
				{countdown.value.segments.map((segment) => (
					<div class="grid content-start gap-1.5" key={segment.label}>
						<span class="block min-h-[1em] overflow-hidden">
							<span
								class="block animate-countdown-tick text-[clamp(2.2rem,5.4vw,4.2rem)] font-semibold leading-none tracking-[-0.08em] text-festival-navy max-[680px]:text-[clamp(2rem,11vw,3.2rem)]"
								key={`${segment.label}-${segment.value}`}
							>
								{segment.value}
							</span>
						</span>
						<span class="text-[0.62rem] uppercase tracking-[0.16em] text-festival-muted max-[420px]:text-[0.58rem] max-[420px]:tracking-[0.12em]">
							{segment.label}
						</span>
					</div>
				))}
			</div>
		</FestivalShell>
	)
})
