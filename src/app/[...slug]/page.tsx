import { notFound } from "next/navigation";
import { CityHubView } from "@/components/CityHubView";
import { PseoPageView } from "@/components/PseoPageView";
import { cityHubMetadata, pageMetadata } from "@/lib/seo/metadata";
import {
  getAllDynamicPaths,
  getCityByName,
  getCityBySlug,
  getLocalPage,
  getNationalPage,
  getPageByPath,
  isCitySlug,
  type PageRecord,
} from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getAllDynamicPaths();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = "/" + slug.join("/");

  if (slug.length === 1 && isCitySlug(slug[0])) {
    const city = getCityBySlug(slug[0]);
    if (!city) return { title: "Not found" };
    return cityHubMetadata(city);
  }

  const page = resolvePage(slug);
  if (!page) return { title: "Not found" };

  const city = page.city ? getCityByName(page.city) : undefined;
  return pageMetadata(page, path, city);
}

function resolvePage(slug: string[]): PageRecord | undefined {
  if (slug.length === 1) {
    const segment = slug[0];
    if (isCitySlug(segment)) return undefined;
    return getNationalPage(segment) ?? getPageByPath(`/${segment}`);
  }
  if (slug.length === 2) {
    const [citySlug, serviceSlug] = slug;
    return getLocalPage(citySlug, serviceSlug) ?? getPageByPath(`/${citySlug}/${serviceSlug}`);
  }
  return undefined;
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;

  if (slug.length === 1 && isCitySlug(slug[0])) {
    const city = getCityBySlug(slug[0]);
    if (!city) notFound();
    return <CityHubView city={city} />;
  }

  const page = resolvePage(slug);
  if (!page) notFound();

  return <PseoPageView page={page} />;
}
