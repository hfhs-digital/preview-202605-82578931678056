import { Slot, component$ } from '@builder.io/qwik'

type FestivalShellProps = {
	narrow?: boolean
}

export const FestivalShell = component$<FestivalShellProps>(({ narrow }) => {
	return (
		<main class="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-[clamp(24px,5vw,56px)] py-[clamp(24px,5vw,56px)] max-[900px]:px-[28px] max-[900px]:pb-10 max-[900px]:pt-8 max-[680px]:items-start max-[680px]:px-[22px] max-[680px]:pb-8 max-[680px]:pt-16 max-[420px]:px-[18px] max-[420px]:pb-7 max-[420px]:pt-14">
			<div
				class="pointer-events-none absolute bottom-[10%] left-[-6%] h-[380px] w-[380px] rounded-full bg-[rgba(203,231,255,0.85)] blur-[32px] max-[900px]:h-[300px] max-[900px]:w-[300px] max-[420px]:h-[220px] max-[420px]:w-[220px]"
				aria-hidden="true"
			/>
			<div
				class="pointer-events-none absolute right-[-10%] top-[2%] h-[480px] w-[480px] rounded-full bg-[rgba(228,241,255,0.9)] blur-[32px] max-[900px]:h-[360px] max-[900px]:w-[360px] max-[420px]:h-[280px] max-[420px]:w-[280px]"
				aria-hidden="true"
			/>

			<section
				class={[
					'relative w-full py-[clamp(18px,3vw,28px)] max-[680px]:py-0',
					narrow
						? 'max-w-[800px] max-[900px]:max-w-[520px]'
						: 'max-w-[1000px] max-[900px]:max-w-[680px]',
				]}
			>
				<Slot />
			</section>
		</main>
	)
})
