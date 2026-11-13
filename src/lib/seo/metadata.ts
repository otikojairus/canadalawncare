import type { Metadata } from "next";
import type { CityRecord, PageRecord } from "../site-data";
import { getCityEnrichment } from "../city-enrichment";
import { buildPageContent } from "./content";
import { BRAND, SITE_URL } from "./constants";

function trimToLength(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function canonicalUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${p}`;
}

export function buildSeoTitle(page: PageRecord, city?: CityRecord): string {
  if (page.pageType === "City × Service" && city) {
    const base = `${titleCaseKeyword(page.keyword)} ${city.name}`;
    const withBrand = `${base} | ${BRAND}`;
    return trimToLength(withBrand, 60);
  }
  const base = `${titleCaseKeyword(page.keyword)} Canada`;
  return trimToLength(`${base} | ${BRAND}`, 60);
}

export function buildCityHubTitle(city: CityRecord): string {
  return trimToLength(`Lawn Care ${city.name}, ${city.province} | ${BRAND}`, 60);
}

export function buildSeoDescription(page: PageRecord, city?: CityRecord): string {
  const content = buildPageContent(page, city);
  const area =
    city && page.pageType === "City × Service"
      ? `${city.name}, ${city.province}`
      : "Canada";
  const lead = `${titleCaseKeyword(page.keyword)} in ${area}.`;
  const snippet = content.intro.replace(/\s+/g, " ").slice(0, 90);
  const cta = " Call 1-800-CAN-LAWN for local availability.";
  return trimToLength(`${lead} ${snippet}${cta}`, 160);
}

export function buildCityHubDescription(city: CityRecord): string {
  const e = getCityEnrichment(city.slug);
  const climate = e?.climate ?? "northern seasonal swings";
  return trimToLength(
    `Lawn care in ${city.name}, ${city.province}: mowing, aeration, and seasonal programs for ${climate}. Call 1-800-CAN-LAWN.`,
    160
  );
}

export function titleCaseKeyword(keyword: string): string {
  return keyword
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function pageMetadata(
  page: PageRecord,
  path: string,
  city?: CityRecord
): Metadata {
  return {
    title: buildSeoTitle(page, city),
    description: buildSeoDescription(page, city),
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title: buildSeoTitle(page, city),
      description: buildSeoDescription(page, city),
      url: canonicalUrl(path),
      siteName: BRAND,
      locale: "en_CA",
      type: "website",
    },
  };
}

export function cityHubMetadata(city: CityRecord): Metadata {
  const path = `/${city.slug}`;
  return {
    title: buildCityHubTitle(city),
    description: buildCityHubDescription(city),
    alternates: { canonical: canonicalUrl(path) },
  };
}
