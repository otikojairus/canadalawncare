import { describeService } from "../page-copy";
import type { CityRecord, PageRecord, ServiceRecord } from "../site-data";
import { cities, getCityBySlug, services } from "../site-data";
import { getCityEnrichment } from "../city-enrichment";

export type FaqItem = { question: string; answer: string };
export type ContentSection = { heading: string; level: 2 | 3; paragraphs: string[] };

export type PageContent = {
  h1: string;
  /** Short copy for the hero only (SEO body lives in sections). */
  heroLead: string;
  /** Full intro — metadata + first overview section. */
  intro: string;
  sections: ContentSection[];
  faqs: FaqItem[];
  locationFacts: string[];
};

function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickVariant<T>(slug: string, items: T[]): T {
  return items[hashSlug(slug) % items.length];
}

const serviceAngles: Record<string, string[]> = {
  "Lawn Mowing Service": [
    "striping patterns that respect compact suburban lot lines",
    "bi-weekly schedules that flex around rain days",
    "bagging or mulching based on municipal yard-waste rules",
  ],
  "Lawn Aeration": [
    "double-pass core aeration when clay is severely compacted",
    "timing visits before overseeding for better seed-to-soil contact",
    "marking sprinkler heads and shallow irrigation lines before coring",
  ],
  "Lawn Fertilization": [
    "slow-release blends aligned with provincial fertilizer legislation",
    "spot treatments for dog runs and high-traffic corners",
    "soil tests before applying potassium-heavy fall winterizer",
  ],
  "Lawn Weed Control": [
    "hand-pull and iron-based options where pesticide bans apply",
    "pre-emergent where regulations allow for crabgrass pressure",
    "re-treatment windows after heavy rain dilutes treatments",
  ],
  default: [
    "documenting shade patterns that change turf density each season",
    "edging along driveways damaged by municipal snow clearing",
    "coordinating spring cleanup with aeration and first fertilization",
  ],
};

function anglesFor(service: string, slug: string): string[] {
  const base = serviceAngles[service] ?? serviceAngles.default;
  const extra = pickVariant(slug, base);
  return [extra, pickVariant(slug + "b", base), pickVariant(slug + "c", base)];
}

export function buildPageContent(page: PageRecord, city?: CityRecord): PageContent {
  if (page.pageType === "City × Service" && city) {
    return buildLocalContent(page, city);
  }
  return buildNationalContent(page);
}

export function buildCityHubContent(city: CityRecord): PageContent {
  const e = getCityEnrichment(city.slug);
  const h1 = `Lawn Care in ${city.name}, ${city.province}`;
  const intro = [
    `Homeowners and property managers in ${city.name} count on reliable lawn care because local turf deals with ${e?.climate ?? "sharp seasonal swings"} across a population of roughly ${e?.population ?? "a growing metro"}.`,
    `Canada Lawn Care crews route through ${city.name} with quiet electric mowing, aeration, fertilization, and weed management tuned to ${city.province} regulations and your lot’s sun exposure.`,
    `Whether you are near ${e?.landmark ?? "downtown"} or in ${e?.neighbourhoods?.[0] ?? "established suburbs"}, we document soil moisture, thatch, and salt damage after every visit so you know what was done and what comes next in the season.`,
    `Explore service pages below for mowing, maintenance, commercial grounds, and seasonal recovery — each guide is written for ${city.name} lawns, not generic templates.`,
  ].join(" ");

  const locationFacts = locationFactLines(city, e);
  const sections: ContentSection[] = [
    {
      heading: `Why ${city.name} lawns need a local plan`,
      level: 2,
      paragraphs: [
        `${city.note ?? `Properties in ${city.name} mix detached homes, townhouses, and commercial storefronts.`} Hardiness zone ${e?.hardiness ?? "5–6"} timing means spring snow mold cleanup often starts weeks before southern Ontario marketing calendars suggest.`,
        `Neighbourhoods such as ${e?.neighbourhoods?.[0] ?? "core districts"} and ${e?.neighbourhoods?.[1] ?? "outer suburbs"} see different shade, irrigation, and foot-traffic patterns. We adjust mowing height, fertilization rate, and aeration depth accordingly.`,
      ],
    },
    {
      heading: "Programs available in your area",
      level: 2,
      paragraphs: [
        `From recurring mowing to one-time sod installation, every program uses equipment sized for ${city.name} lot widths and parking access. Commercial clients receive the same visit scorecards with gate codes and photo documentation.`,
      ],
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: `Do you serve all of ${city.name}?`,
      answer: `Yes — we cover ${city.name}, ${city.province}, including ${e?.neighbourhoods?.[0] ?? "central areas"} and ${e?.neighbourhoods?.[1] ?? "surrounding suburbs"}. Call 1-800-CAN-LAWN to confirm routing for your postal code.`,
    },
    {
      question: `When should I start spring lawn care in ${city.name}?`,
      answer: `Most ${city.name} lawns need dethatching or light raking once soil drains, usually after the last heavy frost. With ${e?.climate ?? "local weather"}, we often begin structured mowing 2–4 weeks before summer peak growth.`,
    },
    {
      question: `What services are most popular in ${city.name}?`,
      answer: `Mowing, fertilization, and aeration lead requests in ${city.name}. Properties near ${e?.landmark ?? "busy corridors"} also book weed control and overseeding after harsh winters.`,
    },
    {
      question: `Are products safe for pets and pollinators?`,
      answer: `We prioritize organic-forward nutrients and mechanical weed control where ${city.province} restricts pesticides. Technicians flag flowering beds so treatments avoid bee forage windows.`,
    },
  ];

  const heroLead = `Quiet electric mowing and full-season lawn programs for ${city.name} — sized for zone ${e?.hardiness ?? "5–6"} turf and ${city.province} bylaws.`;
  const sectionsWithOverview: ContentSection[] = [
    { heading: "About lawn care in your city", level: 2, paragraphs: [intro] },
    ...sections,
  ];
  return { h1, heroLead, intro, sections: sectionsWithOverview, faqs, locationFacts };
}

function buildLocalContent(page: PageRecord, city: CityRecord): PageContent {
  const e = getCityEnrichment(city.slug);
  const slug = page.slug;
  const angles = anglesFor(page.service, slug);
  const h1 = `${page.service} in ${city.name}, ${city.province}`;
  const intro = [
    `Looking for ${page.keyword} in ${city.name}? ${describeService(page.service)} Our ${city.name} crews know how ${e?.climate ?? "local weather"} affects rooting depth, mower timing, and spring recovery on typical ${city.province} lots.`,
    `We regularly work near ${e?.landmark ?? "major corridors"} and in ${e?.neighbourhoods?.[0] ?? "central neighbourhoods"}, including properties that face salt spray, clay compaction, or heavy shade from mature trees.`,
    `${angles[0]} is part of how we deliver consistent results for homeowners who want curb appeal without weekend equipment maintenance.`,
    `If you manage rental units, HOA common areas, or a single-family home in ${e?.neighbourhoods?.[1] ?? city.name}, you can call 1-800-CAN-LAWN to confirm route availability and seasonal start dates.`,
  ].join(" ");

  const locationFacts = locationFactLines(city, e);

  const sections: ContentSection[] = [
    {
      heading: `${page.service} tailored to ${city.name}`,
      level: 2,
      paragraphs: [
        `Hardiness zone ${e?.hardiness ?? "5–6a"} lawns around ${city.name} often carry extra thatch after long snow cover. We combine ${page.keyword} with edging, blow-off, and soil checks so turf rebounds evenly in spring.`,
        angles[1],
        `Population growth near ${e?.population ?? "the metro"} means more strata and narrow side yards; our electric fleet fits tighter gates and early-morning noise bylaws in ${city.name}.`,
      ],
    },
    {
      heading: "Seasonal timing",
      level: 2,
      paragraphs: [
        pickVariant(slug, [
          `Early season visits focus on debris removal and first cuts at higher height to reduce crown stress.`,
          `Mid-summer cuts emphasize hydration cues and grub monitoring common in ${city.province}.`,
          `Fall visits lower height gradually and prepare turf for freeze while roots still absorb nutrients.`,
        ]),
        `${angles[2]} helps visits stay efficient when ${city.name} weather shifts week to week.`,
      ],
    },
    {
      heading: "What visits include",
      level: 2,
      paragraphs: [
        describeService(page.service),
        `Technicians photograph completed work, note gate access, and flag irrigation or drainage issues visible during ${page.keyword} appointments.`,
      ],
    },
    {
      heading: `Local insight for ${city.name}`,
      level: 2,
      paragraphs: [
        `Clients near ${e?.landmark ?? "the urban core"} often request ${page.keyword} after municipal snow clearing damages boulevard turf. We raise mower height until repaired areas knit in.`,
        `In ${e?.neighbourhoods?.[0] ?? "older districts"}, mature maples create shade lines that change by month; in ${e?.neighbourhoods?.[1] ?? "newer suburbs"}, fresh clay subgrade dries unevenly until aeration opens the profile.`,
        `Your visit plan references zone ${e?.hardiness ?? "5–6"} frost dates so spring and fall treatments do not run too early for ${city.province}.`,
      ],
    },
  ];

  const faqs = buildLocalFaqs(page, city, e);
  const heroLead = `${describeService(page.service).replace(/\.$/, "")} in ${city.name}. Crews cover ${e?.neighbourhoods?.[0] ?? "the metro"} and zone ${e?.hardiness ?? "5–6"} seasonal timing.`;
  const sectionsWithOverview: ContentSection[] = [
    { heading: `Overview`, level: 2, paragraphs: [intro] },
    ...sections,
  ];

  return { h1, heroLead, intro, sections: sectionsWithOverview, faqs, locationFacts };
}

function buildNationalContent(page: PageRecord): PageContent {
  const slug = page.slug;
  const angles = anglesFor(page.service, slug);
  const h1 = `${page.service} Across Canada`;
  const intro = [
    `${describeService(page.service)} Canada Lawn Care delivers ${page.keyword} from British Columbia to Atlantic Canada with programs built for freeze-thaw damage, road salt, and regional clay — not mild-climate playbooks copied from the U.S.`,
    `National crews follow the same five-step process: lot assessment, soil testing, quiet electric maintenance, digital visit reports, and retreat guarantees where weed control is included.`,
    angles[0],
    `Select your city on this page to read local timing, neighbourhood notes, and FAQs for ${page.keyword} near you — every market page is written for that metro’s climate and bylaws.`,
    `Ready to start? Call 1-800-CAN-LAWN and we will match you with routes in your province or send you to the right local guide immediately.`,
  ].join(" ");

  const heroLead = `${describeService(page.service).replace(/\.$/, "")} — coast to coast with quiet electric crews. Choose your city for local timing.`;

  const sections: ContentSection[] = [
    { heading: "Overview", level: 2, paragraphs: [intro] },
    {
      heading: `Why homeowners choose our ${page.service.toLowerCase()}`,
      level: 2,
      paragraphs: [
        `We bundle mowing height discipline, sharp blades, and clean edging whenever ${page.keyword} is on your program.`,
        angles[1],
        angles[2],
      ],
    },
    {
      heading: "Residential and commercial coverage",
      level: 2,
      paragraphs: [
        `Retail plazas, office parks, and detached homes all receive documented visits. Commercial ${page.keyword} can run on tighter early-morning windows; residential routes cluster by neighbourhood to reduce drive time and emissions.`,
        `Organic-forward fertilizer and iron-based weed options are used where provincial law limits conventional pesticides.`,
      ],
    },
    {
      heading: "Regional considerations",
      level: 2,
      paragraphs: [
        `Prairie cities face chinook drying and heavy clay; Lower Mainland lawns need summer irrigation discipline; Atlantic properties battle salt and fog-driven fungus. Our ${page.service.toLowerCase()} playbooks adjust aeration depth, seed blend, and fertilization ratio accordingly.`,
        `French-language service areas in Quebec may prefer bilingual scheduling — call and ask for availability in your municipality.`,
      ],
    },
    {
      heading: "Service standards on every visit",
      level: 2,
      paragraphs: [
        `Blades are sharpened daily, clippings are managed per municipal bylaws, and technicians note dog areas or pollinator beds before treatments.`,
        `If you're comparing providers, look for documented soil testing, licensed applicators where required, and electric equipment that meets neighbourhood noise expectations.`,
      ],
    },
    {
      heading: "How booking works — our process",
      level: 2,
      paragraphs: [
        `Call 1-800-CAN-LAWN with your postal code and lot type. We confirm route density, first-visit timing, and whether ${page.service.toLowerCase()} should pair with aeration or fertilization in your season.`,
        `Recurring clients receive visit reminders and photo scorecards; one-time projects such as sod or heavy dethatching include preparation instructions before crews arrive.`,
        `If you need bilingual scheduling or strata authorization forms, mention it during booking so paperwork is handled before the first ${page.keyword} visit.`,
      ],
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: `What is included in ${page.keyword} with Canada Lawn Care?`,
      answer: `${describeService(page.service)} Exact visit lists depend on season and city bylaws; local pages spell out spring, summer, and fall tasks for your market.`,
    },
    {
      question: `How do I find ${page.keyword} near me?`,
      answer: `Use the city links on this page or call 1-800-CAN-LAWN. We cover 44 major Canadian cities with localized crews and scheduling.`,
    },
    {
      question: `When is the best season to book ${page.service.toLowerCase()}?`,
      answer: `Most clients start in spring once soil firms up; aeration and overseeding peak in early fall. Southern BC and coastal markets begin growth weeks earlier than Prairie cities.`,
    },
    {
      question: `Do you use gas mowers for ${page.keyword}?`,
      answer: `Primary routes use battery electric equipment under roughly 62 dB for residential neighbourhoods. Larger commercial lots may use efficient modern gear where electric runtime requires it.`,
    },
    {
      question: `Can I combine ${page.service.toLowerCase()} with fertilization or weed control?`,
      answer: `Yes — bundled seasonal programs are common. Technicians sequence treatments so nutrients and mechanical work do not stress turf on the same day.`,
    },
  ];

  return { h1, heroLead, intro, sections, faqs, locationFacts: [] };
}

function buildLocalFaqs(
  page: PageRecord,
  city: CityRecord,
  e: ReturnType<typeof getCityEnrichment>
): FaqItem[] {
  return [
    {
      question: `How much does ${page.keyword} cost in ${city.name}?`,
      answer: `Pricing depends on lot size, slope, obstacles, and frequency. ${city.name} routes factor in travel within ${e?.neighbourhoods?.[0] ?? "core areas"} and ${e?.neighbourhoods?.[1] ?? "suburbs"}. Call 1-800-CAN-LAWN for a quote based on your property layout.`,
    },
    {
      question: `When should I schedule ${page.service.toLowerCase()} in ${city.name}?`,
      answer: `With ${e?.climate ?? "local seasons"}, most lawns need attention soon after snow melt. Zone ${e?.hardiness ?? "5–6"} timing guides our spring start and fall wind-down dates.`,
    },
    {
      question: `Do you offer ${page.keyword} near ${e?.landmark ?? city.name + " centre"}?`,
      answer: `Yes — crews service properties near ${e?.landmark ?? "downtown"} and surrounding districts. Mention your postal code when you call so we confirm the right route.`,
    },
    {
      question: `Is ${page.service.toLowerCase()} available for commercial properties in ${city.name}?`,
      answer: `Commercial mowing and grounds maintenance run on separate schedules with early access windows. Ask about bundled ${page.keyword} for retail, office, and strata sites in ${city.province}.`,
    },
  ];
}

function locationFactLines(
  city: CityRecord,
  e: ReturnType<typeof getCityEnrichment>
): string[] {
  if (!e) return [];
  return [
    `${city.name} metro population is approximately ${e.population}, with lawn demand spread across established and growing subdivisions.`,
    `Typical climate: ${e.climate}; turf hardiness around zone ${e.hardiness}.`,
    `Crews reference landmarks such as ${e.landmark} and neighbourhoods including ${e.neighbourhoods[0]} and ${e.neighbourhoods[1]} when routing visits.`,
  ];
}

export function wordCountForContent(content: PageContent): number {
  const all = [
    content.intro,
    ...content.sections.flatMap((s) => s.paragraphs),
    ...content.faqs.flatMap((f) => f.question + " " + f.answer),
    ...content.locationFacts,
  ].join(" ");
  return all.split(/\s+/).filter(Boolean).length;
}

export function nationalCityLinks(service: ServiceRecord): { href: string; label: string }[] {
  return cities.map((c) => ({
    href: `/${c.slug}/${service.slug.replace(/^\//, "")}`,
    label: c.name,
  }));
}

export function siblingServiceLinks(
  citySlug: string,
  currentService: string,
  limit = 6
): { href: string; label: string }[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return services
    .filter((s) => s.topic !== currentService)
    .slice(0, limit)
    .map((s) => ({
      href: `/${citySlug}${s.slug}`,
      label: s.keyword,
    }));
}
