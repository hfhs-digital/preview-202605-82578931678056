import { component$ } from '@builder.io/qwik'
import { type DocumentHead, Link } from '@builder.io/qwik-city'
import { FestivalShell } from '~/components/festival-shell/festival-shell'

export default component$(() => {
	return (
		<FestivalShell narrow>
			<p class="m-0 mb-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.12em]">
				404 / PAGE NOT FOUND
			</p>
			<h1 class="m-0 flex items-center gap-[clamp(8px,1.8vw,14px)] text-[clamp(2.7rem,7.6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.08em] max-[680px]:text-[clamp(2.5rem,11vw,4rem)] max-[420px]:text-[clamp(2.15rem,12vw,3.2rem)]">
				<span class="tracking-[1px]">Not Found</span>
			</h1>
			<p class="mt-4 inline-flex flex-wrap items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-festival-navy-soft max-[680px]:mt-3.5 max-[680px]:grid max-[680px]:gap-1.5 max-[420px]:text-[0.66rem] max-[420px]:tracking-[0.12em]">
				<span>HFHS SCHOOL FESTIVAL 2026</span>
			</p>
			<p class="mt-4 max-w-[28rem] text-[0.98rem] leading-[1.7] text-festival-muted max-[680px]:mt-3.5 max-[680px]:max-w-[21rem] max-[680px]:text-[0.94rem]">
				お探しのページは存在しないか、移動しました。トップページからもう一度ご確認ください。
			</p>
			<div class="mt-7 max-[420px]:mt-6">
				<Link
					href="/"
					class="inline-flex items-center justify-center rounded-full border border-festival-line bg-[rgba(255,255,255,0.55)] px-[18px] py-3 text-festival-navy no-underline transition duration-150 ease-out hover:-translate-y-px hover:border-[rgba(20,48,79,0.24)] hover:bg-[rgba(255,255,255,0.88)]"
				>
					Back to Home
				</Link>
			</div>
		</FestivalShell>
	)
})

export const head: DocumentHead = {
	title: '404 | HFHS School Festival 2026',
	meta: [
		{
			name: 'description',
			content:
				'Custom not found page for the HFHS School Festival 2026 website.',
		},
	],
}
