/**
 * microCMS fetch helpers.
 *
 * All exports are server-side only — import only from routeLoader$, server$,
 * or onStaticGenerate. They must never be imported from client components.
 *
 * Environment variables (set in .env.local for dev, GitHub Actions secrets for CI):
 *   MICROCMS_SERVICE_DOMAIN — e.g. "my-service" for my-service.microcms.io
 *   MICROCMS_API_KEY        — X-MICROCMS-API-KEY value
 */

// ─── Content types ────────────────────────────────────────────────────────────

export type NewsThumbnail = {
	url: string
	width: number
	height: number
}

export type NewsItem = {
	id: string
	title: string
	content: string
	publishedAt: string
	createdAt: string
	updatedAt: string
	category?: string[]
	thumbnail?: NewsThumbnail
}

export type CMSPage = {
	id: string
	title: string
	content: string
	publishedAt: string
	updatedAt: string
	description?: string
}

export type ImportantNews = {
	id: string
	title: string
	link: NewsItem
}

export type ListResponse<T> = {
	contents: T[]
	totalCount: number
	offset: number
	limit: number
}

// ─── Internal fetch helper ────────────────────────────────────────────────────

const domain = process.env.MICROCMS_SERVICE_DOMAIN ?? ''
const apiKey = process.env.MICROCMS_API_KEY ?? ''

async function get<T>(
	path: string,
	params?: Record<string, string>,
): Promise<T | null> {
	if (!domain || !apiKey) return null

	// Mirror server
	const url = new URL(`https://${domain}.microcms.io/api/v1${path}`)
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.set(key, value)
		}
	}

	try {
		const res = await fetch(url.toString(), {
			headers: { 'X-MICROCMS-API-KEY': apiKey },
		})
		if (!res.ok) return null
		return (await res.json()) as T
	} catch {
		return null
	}
}

// ─── Public helpers ───────────────────────────────────────────────────────────

/** Fetch the latest news items. Default limit is 20. */
export const fetchNewsList = (limit = 20, offset = 0) =>
	get<ListResponse<NewsItem>>('/news', {
		limit: String(limit),
		offset: String(offset),
		orders: '-publishedAt',
	})

/** Fetch only the 3 most recent items for the homepage preview. */
export const fetchNewsPreview = () =>
	get<ListResponse<NewsItem>>('/news', {
		limit: '3',
		orders: '-publishedAt',
		fields: 'id,title,publishedAt,category',
	})

/** Fetch all news IDs for SSG path generation. */
export const fetchAllNewsIds = async (): Promise<string[]> => {
	const data = await get<ListResponse<NewsItem>>('/news', {
		limit: '100',
		fields: 'id',
	})
	return data?.contents.map((item) => item.id) ?? []
}

/** Fetch a single news article by ID. */
export const fetchNewsArticle = (id: string) => get<NewsItem>(`/news/${id}`)

/** Fetch a CMS-managed page by ID. */
export const fetchCMSPage = (id: string) => get<CMSPage>(`/pages/${id}`)

/** Fetch all CMS page IDs for SSG path generation. */
export const fetchAllPageIds = async (): Promise<string[]> => {
	const data = await get<ListResponse<CMSPage>>('/pages', {
		limit: '100',
		fields: 'id',
	})
	return data?.contents.map((item) => item.id) ?? []
}

/** Fetch the important-news singleton. Returns null when not set in CMS. */
export const fetchImportantNews = () => get<ImportantNews>('/important-news')
