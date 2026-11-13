/**
 * Regenerate data/*.json from the pSEO master spreadsheet.
 * Requires: pip install openpyxl (or use python3 with openpyxl installed)
 */
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const xlsx =
  process.env.PSEO_XLSX ||
  path.join(process.env.HOME, "Downloads/pSEO - Canada Lawn Care Master.xlsx");

const py = `
import openpyxl, json, re
from pathlib import Path
wb = openpyxl.load_workbook(${JSON.stringify(xlsx)}, read_only=True, data_only=True)
ws = wb['pSEO Page Plan']
headers = None
rows = []
for row in ws.iter_rows(values_only=True):
    if row and len(row) > 1 and row[0] == '#':
        headers = list(row)
        continue
    if headers and row and row[0] is not None and str(row[0]).replace('.0','').isdigit():
        d = {headers[i]: row[i] if i < len(row) else None for i in range(len(headers))}
        rows.append(d)

def slugify(s):
    if not s: return ''
    s = str(s).lower().strip()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

national = [r for r in rows if r.get('Page Type') == 'National Service']
services = []
seen=set()
for r in national:
    st = r.get('Service Topic')
    if st and st not in seen:
        seen.add(st)
        services.append({
            'topic': st,
            'slug': r.get('Page Slug'),
            'title': r.get('Page Title'),
            'keyword': r.get('Primary Keyword'),
            'secondary': r.get('Secondary Keywords') or '',
            'priority': r.get('Priority'),
            'cluster': r.get('Cluster / SERP Note'),
        })

pages_out = []
for r in rows:
    slug = r.get('Page Slug') or ''
    if not slug: continue
    if not slug.startswith('/'):
        slug = '/' + slug
    sec = r.get('Secondary Keywords')
    pages_out.append({
        'title': r.get('Page Title'),
        'slug': slug,
        'keyword': r.get('Primary Keyword'),
        'secondaryKeywords': [x.strip() for x in sec.split(';')] if sec else [],
        'targetArea': r.get('Target Area'),
        'pageType': r.get('Page Type'),
        'service': r.get('Service Topic'),
        'city': r.get('City'),
        'province': r.get('Province'),
        'priority': r.get('Priority'),
        'cta': r.get('CTA'),
        'clusterNote': r.get('Cluster / SERP Note'),
    })

ws2 = wb['City Target Coverage']
h=None
cities=[]
for row in ws2.iter_rows(values_only=True):
    if row and row[0]=='#':
        h=list(row); continue
    if h and row and row[0] and isinstance(row[0], (int,float)):
        cities.append(dict(zip(h,row)))

cities_out = [{
    'name': c.get('City / Area'),
    'province': c.get('Province'),
    'slug': slugify(c.get('City / Area')),
    'priority': c.get('Launch Priority'),
    'note': c.get('Market Note'),
} for c in cities]

out = Path(${JSON.stringify(path.join(root, "data"))})
out.mkdir(parents=True, exist_ok=True)
(out/'services.json').write_text(json.dumps(services, indent=2))
(out/'cities.json').write_text(json.dumps(cities_out, indent=2))
(out/'pages.json').write_text(json.dumps(pages_out, indent=2))
print('Wrote', len(services), 'services', len(cities_out), 'cities', len(pages_out), 'pages')
`;

execSync(`python3 -c ${JSON.stringify(py)}`, { stdio: "inherit", cwd: root });
