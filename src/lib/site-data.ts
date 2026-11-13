import pagesRaw from "../../data/pages.json";
import citiesRaw from "../../data/cities.json";
import servicesRaw from "../../data/services.json";

export type PageRecord = {
  title: string;
  slug: string;
  keyword: string;
  secondaryKeywords: string[];
  targetArea: string;
  pageType: string;
  service: string;
  city: string | null;
  province: string | null;
  priority: string;
  cta: string;
  clusterNote: string | null;
};

export type CityRecord = {
  name: string;
  province: string;
  slug: string;
  priority: string;
  note: string | null;
};

export type ServiceRecord = {
  topic: string;
  slug: string;
  title: string;
  keyword: string;
  secondary: string;
  priority: string;
  cluster: string | null;
};

export const pages = pagesRaw as PageRecord[];
export const cities = citiesRaw as CityRecord[];
export const services = servicesRaw as ServiceRecord[];

const citySlugSet = new Set(cities.map((c) => c.slug));

export function isCitySlug(segment: string): boolean {
  return citySlugSet.has(segment);
}

export function slugToPath(slug: string): string {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export function pathToSlug(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function getPageByPath(path: string): PageRecord | undefined {
  const normalized = pathToSlug(path);
  return pages.find((p) => p.slug === normalized);
}

export function getNationalPage(serviceSlug: string): PageRecord | undefined {
  const slug = pathToSlug(serviceSlug.replace(/^\//, ""));
  if (!slug.startsWith("/")) return undefined;
  return pages.find(
    (p) => p.pageType === "National Service" && p.slug === slug
  );
}

export function getLocalPage(citySlug: string, serviceSlug: string): PageRecord | undefined {
  const slug = `/${citySlug}/${serviceSlug.replace(/^\//, "")}`;
  return pages.find((p) => p.slug === slug);
}

export function getCityBySlug(slug: string): CityRecord | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCityByName(name: string): CityRecord | undefined {
  return cities.find((c) => c.name === name);
}

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  const path = slug.startsWith("/") ? slug : `/${slug}`;
  return services.find((s) => s.slug === path);
}

export function getPagesForCity(citySlug: string): PageRecord[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return pages.filter(
    (p) =>
      p.pageType === "City × Service" &&
      p.city === city.name
  );
}

export function getCitiesByProvince(): Record<string, CityRecord[]> {
  const map: Record<string, CityRecord[]> = {};
  for (const city of cities) {
    if (!map[city.province]) map[city.province] = [];
    map[city.province].push(city);
  }
  for (const prov of Object.keys(map)) {
    map[prov].sort((a, b) => a.name.localeCompare(b.name));
  }
  return map;
}

export function getAllDynamicPaths(): { slug: string[] }[] {
  const paths: { slug: string[] }[] = [];

  for (const s of services) {
    const segment = s.slug.replace(/^\//, "");
    paths.push({ slug: [segment] });
  }

  for (const city of cities) {
    paths.push({ slug: [city.slug] });
    for (const s of services) {
      const serviceSegment = s.slug.replace(/^\//, "");
      paths.push({ slug: [city.slug, serviceSegment] });
    }
  }

  return paths;
}

export const PHONE_DISPLAY = "1-800-CAN-LAWN";
export const PHONE_HREF = "tel:18002265296";
