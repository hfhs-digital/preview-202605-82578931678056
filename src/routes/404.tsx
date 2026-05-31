import { component$ } from '@builder.io/qwik'
import { type DocumentHead, Link } from '@builder.io/qwik-city'
import { FestivalShell } from '~/components/festival-shell/festival-shell'

export default component$(() => {
	return (
		<FestivalShell narrow>
			<div class="flex items-center gap-4">
				<p class="m-0 text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(66,84,104,0.86)]">
					404 / Page Not Found
				</p>
			</div>
			<h1 class="festival-display mt-8 text-[clamp(2.7rem,7.6vw,5.8rem)] font-semibold leading-[0.94] tracking-normal text-[rgb(32,48,66)] max-[680px]:text-[clamp(2.5rem,11vw,4rem)] max-[420px]:text-[clamp(2.15rem,12vw,3.2rem)]">
				Not Found
			</h1>
			<p class="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(141,54,47,0.8)]">
				Higashi Fukuoka School Festival 2026
			</p>
			<p class="festival-copy mt-5 max-w-md text-[0.98rem] leading-[1.9] text-[rgba(66,84,104,0.92)] max-[680px]:max-w-84 max-[680px]:text-[0.94rem]">
				お探しのページは存在しないか、移動しました。トップページからもう一度ご確認ください。
			</p>
			<div class="mt-8 max-[420px]:mt-6">
				<Link
					href="/"
					class="inline-flex items-center justify-center border border-[rgba(32,66,95,0.14)] bg-white px-4.5 py-3 text-[rgb(32,48,66)] no-underline shadow-[0_10px_28px_rgba(32,48,66,0.04)] transition duration-150 ease-out hover:-translate-y-px hover:border-[rgba(141,54,47,0.24)]"
				>
					戻る
				</Link>
			</div>
		</FestivalShell>
	)
})

export const head: DocumentHead = {
	title: '404 | Higashi Fukuoka School Festival 2026',
	meta: [
		{
			name: 'description',
			content:
				'Custom not found page for the Higashi Fukuoka School Festival 2026 website.',
		},
	],
}
