# Canada Lawn Care (pSEO site)

Next.js site using the **Boreal Precision** design from the Stitch landing mock, wired to the **pSEO – Canada Lawn Care Master** spreadsheet.

## What’s included

- **900 static routes**: 20 national services + 44 city hubs + 880 city × service pages
- **Design**: Plus Jakarta Sans, forest/sage palette, editorial layout from `stitch_canada_lawn_care_landing_page`
- **No quote forms or pricing** — the hero “instant quote” UI is a **Service Navigator** (province → city → service deep link)
- **Phone CTA**: `1-800-CAN-LAWN` (`tel:18002265296`)

## Commands

```bash
npm install
npm run dev
npm run build
```

Regenerate JSON from Excel (expects the file in `~/Downloads/` or set `PSEO_XLSX`):

```bash
npm run gen:content
```

## Data

- `data/pages.json` — full page plan
- `data/services.json` — 20 national service clusters
- `data/cities.json` — 44 city targets

## Routing

| Path | Page |
|------|------|
| `/` | Marketing home |
| `/services` | National service index |
| `/cities` | City directory by province |
| `/lawn-mowing-service` | National pSEO page |
| `/toronto` | City hub (20 links) |
| `/toronto/lawn-mowing-service` | Local pSEO page |
