  Next steps to go live:

   1. Add MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY as GitHub Actions secrets
   2. Create the 3 microCMS API schemas: news (title, body, publishedAt, category, thumbnail), pages (title, body, description), important-news singleton (title, link→news)
   3. Set up microCMS webhook → POST /repos/{owner}/{repo}/dispatches with event_type: microcms-update
   4. Flip HOME_PAGE_VARIANT in src/features/home/config.ts from 'coming-soon' → 'production' when ready to launch