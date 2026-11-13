# Pre-launch SEO checklist

Use this against a staging URL with `NEXT_PUBLIC_SITE_URL` set to production.

- [ ] Unique title + meta on every page (see `src/lib/seo/metadata.ts`)
- [ ] One H1 per page with keyword + location (`src/lib/seo/content.ts`)
- [ ] Self-referencing canonical on every page (`alternates.canonical`)
- [ ] All pages in `/sitemap.xml`, `robots.txt` allows crawl, no `noindex`
- [ ] Schema: [Rich Results Test](https://search.google.com/test/rich-results) — BreadcrumbList, FAQPage, Service, LocalBusiness
- [ ] Zero orphan pages: pillars link all cities; city hubs link all services; locals link pillar + siblings
- [ ] FAQPage schema on all FAQ sections
- [ ] Images have descriptive `alt` on templates
- [ ] Phone `tel:18002265296` on CTAs (min 44px touch targets via `AboveFoldCta`)
- [ ] PageSpeed mobile ≥ 70 per template (run Lighthouse on `/`, `/lawn-mowing-service`, `/toronto`, `/toronto/lawn-mowing-service`)
- [ ] Breadcrumbs match URL structure (`Breadcrumbs` + `breadcrumbSchema`)

**Note:** URL pattern follows the pSEO master (`/{city}/{service}` and `/{service}` pillars), not `service-city` single slugs.
