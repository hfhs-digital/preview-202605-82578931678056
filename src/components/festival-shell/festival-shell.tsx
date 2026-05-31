import { component$, Slot } from '@builder.io/qwik'

type FestivalShellProps = {
	narrow?: boolean
}

export const FestivalShell = component$<FestivalShellProps>(({ narrow }) => {
	return (
		<main class="relative isolate min-h-screen overflow-hidden bg-[var(--color-paper-0)] px-[clamp(24px,5vw,56px)] py-[clamp(32px,6vw,64px)] max-[680px]:px-[22px]">
			<div
				class="pointer-events-none absolute right-[-12%] top-[-10%] -z-10 h-[520px] w-[520px] rounded-full max-[900px]:h-[360px] max-[900px]:w-[360px]"
				aria-hidden="true"
				style={{
					backgroundImage:
						'radial-gradient(circle at 35% 35%, rgba(217,115,106,0.18) 0%, rgba(217,115,106,0.08) 28%, rgba(32,66,95,0.06) 46%, rgba(255,255,255,0) 74%)',
				}}
			/>

			<section
				class={[
					'relative mx-auto flex min-h-[calc(100vh-128px)] w-full items-center',
					narrow ? 'max-w-[760px]' : 'max-w-[920px]',
				]}
			>
				<div class="w-full">
					<Slot />
				</div>
			</section>
		</main>
	)
})
