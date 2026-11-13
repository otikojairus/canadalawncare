import type { CityRecord, PageRecord } from "./site-data";

const serviceIntros: Record<string, string> = {
  "Lawn Care Services":
    "Recurring lawn care built for Canadian freeze-thaw cycles — mowing, edging, and seasonal resets.",
  "Lawn Mowing Service":
    "Precision mowing schedules with quiet electric equipment suited to suburban and urban lots.",
  "Grass Cutting Service":
    "Professional grass cutting when you need a crisp cut without overlap with full maintenance bundles.",
  "Lawn Maintenance":
    "Year-round yard maintenance covering turf, trim, and tidy-ups between major seasonal treatments.",
  "Commercial Lawn Care":
    "Grounds programs for business parks, retail plazas, and multi-tenant properties.",
  "Commercial Lawn Mowing":
    "High-frequency mowing for commercial footprints with consistent striping and edge detail.",
  "Lawn Aeration":
    "Core aeration to relieve compaction from clay soils and winter ice sheets.",
  "Lawn Dethatching":
    "Power raking and dethatching to restore airflow after heavy thatch buildup.",
  "Lawn Fertilization":
    "Slow-release feeding plans tuned to provincial regulations and soil testing.",
  "Lawn Weed Control":
    "Weed management with jurisdiction-aware product selection and re-treatment windows.",
  "Lawn Overseeding":
    "Overseeding with northern grass blends after aeration or spring recovery.",
  "Lawn Repair":
    "Targeted repair for pet spots, salt damage, and thin patches after winter.",
  "Sod Installation":
    "Full sod installs with grading, irrigation checks, and establishment watering guidance.",
  "Lawn Seeding":
    "New lawn seeding for bare areas and renovations where sod is not required.",
};

export function describeService(service: string): string {
  return (
    serviceIntros[service] ??
    `Professional ${service.toLowerCase()} for Canadian residential and commercial properties.`
  );
}

export function buildMetaDescription(page: PageRecord): string {
  const area =
    page.city && page.province
      ? `${page.city}, ${page.province}`
      : "communities across Canada";
  return `Looking for trusted ${page.service.toLowerCase()} in ${area}? ${describeService(page.service)} Quiet equipment, organic-forward options, and crews who understand northern seasons.`;
}

export function buildHeroSubtitle(page: PageRecord, city?: CityRecord): string {
  if (page.pageType === "City × Service" && city) {
    return `${describeService(page.service)} Serving ${city.name} and surrounding neighbourhoods in ${city.province}.`;
  }
  return `${describeService(page.service)} Available nationally — select your city below to see local availability and seasonal timing.`;
}

export function areaBadgeLabel(page: PageRecord, city?: CityRecord): string {
  if (page.pageType === "City × Service" && city) {
    return `Local crews • ${city.name}, ${city.province}`;
  }
  return "Serving homeowners & businesses Canada-wide";
}

export const climateFeatures = [
  {
    icon: "dew_point",
    tag: "Early spring recovery",
    title: "Snow mold & frost thaw",
    body:
      "Prolonged snow cover stresses turf. Organic recovery flushes help grey and pink snow mold without harsh synthetics.",
    meta: "March – April",
  },
  {
    icon: "layers",
    tag: "Subsoil engineering",
    title: "Glacial clay aeration",
    body:
      "Ontario and Alberta clay compacts through freeze cycles. Deep core aeration opens channels below the frost line.",
    meta: "Core depth: 75mm+",
  },
  {
    icon: "bug_report",
    tag: "Eco biological defense",
    title: "Chinch bug & grub shield",
    body:
      "Beneficial nematodes and biological controls reduce grub pressure before wildlife damage appears.",
    meta: "Pet & pollinator mindful",
  },
  {
    icon: "ac_unit",
    tag: "Late fall dormancy",
    title: "Freeze-proof winterizer",
    body:
      "Potassium-forward fall nutrition strengthens cell walls for winter and earlier spring green-up.",
    meta: "Built for −35°C dormancy",
  },
];

export const seasonalPrograms = [
  {
    name: "Spring wake-up",
    badge: "Thaw recovery",
    icon: "wb_sunny",
    items: ["De-thatch & blow-off", "First fertilization window", "Crabgrass pre-emergent where permitted"],
  },
  {
    name: "Summer vitality",
    badge: "Most active",
    icon: "grass",
    items: ["Weekly / bi-weekly mowing", "Deep watering guidance", "Grub monitoring & bio control"],
  },
  {
    name: "Fall architecture",
    badge: "Root building",
    icon: "nature",
    items: ["Double-pass aeration", "Overseeding blends", "Leaf management & winterizer"],
  },
];

export const processSteps = [
  { n: "01", icon: "satellite_alt", title: "Lot & shade scan", body: "Map turf area and shade zones before prescribing a program." },
  { n: "02", icon: "science", title: "Soil micro-testing", body: "pH, moisture, and N-P-K inform fertilizer and lime decisions." },
  { n: "03", icon: "volume_off", title: "Quiet electric cuts", body: "Battery mowers keep noise low for dense neighborhoods." },
  { n: "04", icon: "app_shortcut", title: "Visit scorecards", body: "Photo notes and lawn health comments after every visit, straight to your inbox." },
  { n: "05", icon: "verified_user", title: "Zero-weed pledge", body: "If invasive weeds return between scheduled treatments, we re-treat at no extra charge." },
];
