// This file can be used to add references for global types like `vite/client`.

// Add global `vite/client` types. For more info, see: https://vitejs.dev/guide/features#client-types
/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** microCMS service domain (e.g. "my-service" for my-service.microcms.io). Server-side only. */
	readonly MICROCMS_SERVICE_DOMAIN: string
	/** microCMS API key. Server-side only — never sent to the browser. */
	readonly MICROCMS_API_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
