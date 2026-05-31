import { component$ } from '@builder.io/qwik'

type OrigamiEmblemProps = {
	class?: string
}

export const OrigamiEmblem = component$<OrigamiEmblemProps>(
	({ class: className }) => (
		<svg class={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
			<circle
				cx="24"
				cy="24"
				r="22.5"
				stroke="currentColor"
				stroke-width="1.2"
				opacity="0.22"
			/>
			<circle
				cx="24"
				cy="24"
				r="16.5"
				stroke="currentColor"
				stroke-width="0.8"
				opacity="0.14"
			/>
			<g transform="translate(12 12)">
				<path d="M0 0h12L0 12Z" fill="#FFFFFF" />
				<path d="M12 0v12H0Z" fill="currentColor" fill-opacity="0.88" />
				<path d="M12 0h12L12 12Z" fill="#FFFFFF" />
				<path d="M24 0v12H12Z" fill="currentColor" fill-opacity="0.56" />
				<path d="M0 12h12L0 24Z" fill="#FFFFFF" />
				<path d="M12 12v12H0Z" fill="currentColor" fill-opacity="0.56" />
				<path d="M12 12h12L12 24Z" fill="#FFFFFF" />
				<path d="M24 12v12H12Z" fill="currentColor" fill-opacity="0.88" />
				<path
					d="M12 6 18 12 12 18 6 12Z"
					fill="#FFFFFF"
					stroke="currentColor"
					stroke-width="0.8"
					opacity="0.22"
				/>
			</g>
		</svg>
	),
)
