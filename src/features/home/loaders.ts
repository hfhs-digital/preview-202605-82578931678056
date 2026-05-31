import { routeLoader$ } from '@builder.io/qwik-city'
import { fetchNewsPreview } from '~/lib/microcms'

/**
 * Fetches the 3 latest news items for the homepage news preview block.
 * Must be re-exported from the route file (src/routes/index.tsx) for
 * Qwik City to associate this loader with the route.
 */
// eslint-disable-next-line qwik/loader-location
export const useHomeNewsPreview = routeLoader$(async () => {
	return await fetchNewsPreview()
})
