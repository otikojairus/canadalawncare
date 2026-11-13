import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceNavigator } from "./ServiceNavigator";
import { Icon } from "./Icon";
import { AboveFoldCta } from "./seo/AboveFoldCta";
import { Breadcrumbs, type BreadcrumbItem } from "./seo/Breadcrumbs";
import { CityLinkGrid } from "./seo/CityLinkGrid";
import { NorthernClimateBand } from "./service/NorthernClimateBand";
import { ServicePageSections } from "./service/ServicePageSections";
import { FaqSection } from "./seo/FaqSection";
import { JsonLd } from "./seo/JsonLd";
import { LocationHighlights } from "./seo/LocationHighlights";
import {
  buildPageContent,
  nationalCityLinks,
  siblingServiceLinks,
} from "@/lib/seo/content";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/seo/schema";
import { getCityByName, getServiceBySlug, type PageRecord } from "@/lib/site-data";

const HERO_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

export function PseoPageView({ page }: { page: PageRecord }) {
  const city = page.city ? getCityByName(page.city) : undefined;
  const citySlug = city?.slug;
  const isLocal = page.pageType === "City × Service" && city;
  const content = buildPageContent(page, city);
  const servicePath = page.slug.split("/").pop() ?? "";
  const nationalService = getServiceBySlug(`/${servicePath}`);
  const pillarHref = nationalService?.slug ?? `/${servicePath}`;

  const breadcrumbs = buildBreadcrumbs(page, city);
  const schema = [
    breadcrumbSchema(breadcrumbs),
    faqSchema(content.faqs),
    serviceSchema(page, city),
    ...(city && isLocal ? [localBusinessSchema(city)] : []),
  ];

  const cityLinks =
    nationalService && !isLocal ? nationalCityLinks(nationalService) : [];
  const siblingLinks =
    isLocal && citySlug ? siblingServiceLinks(citySlug, page.service, 6) : [];

  const badge = isLocal
    ? `Local crews • ${city!.name}, ${city!.province}`
    : nationalService?.keyword ?? "National program";

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden pb-10 pt-2">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-secondary-fixed/15 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-container/40 text-xs font-bold text-on-secondary-fixed-variant">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                {badge}
              </span>
              <h1 className="text-3xl md:text-[2.75rem] text-primary font-extrabold tracking-tight leading-[1.1]">
                {content.h1}
              </h1>
              <p className="text-base text-on-surface-variant leading-relaxed max-w-xl">
                {content.heroLead}
              </p>
              <AboveFoldCta
                primaryLabel={
                  isLocal
                    ? `Coordinators in ${city!.name}`
                    : "Pick your city on the next step"
                }
                secondaryHref={isLocal ? pillarHref : "/cities"}
                secondaryLabel={isLocal ? "Canada-wide program" : "All cities"}
              />
            </div>
            <HeroImage page={page} isLocal={Boolean(isLocal)} city={city} />
          </div>
        </div>
      </section>

      {content.locationFacts.length > 0 && (
        <section className="pb-10">
          <PageWidth>
            <LocationHighlights facts={content.locationFacts} />
          </PageWidth>
        </section>
      )}

      {!isLocal && (
        <section className="pb-10">
          <PageWidth>
            <ServiceNavigator />
          </PageWidth>
        </section>
      )}

      {!isLocal && <NorthernClimateBand />}

      <ServicePageSections sections={content.sections} page={page} isLocal={Boolean(isLocal)} />

      {isLocal && citySlug && (
        <section className="py-space-xl bg-surface">
          <LocalLinksSection
            pillarHref={pillarHref}
            page={page}
            city={city!}
            siblingLinks={siblingLinks}
          />
        </section>
      )}

      {cityLinks.length > 0 && nationalService && (
        <CityLinkGrid
          title={`${nationalService.keyword} by city`}
          description="Open a city page for neighbourhood context, seasonal timing, and local FAQs."
          links={cityLinks}
        />
      )}

      <FaqSection faqs={content.faqs} />
    </>
  );
}

function HeroImage({
  page,
  isLocal,
  city,
}: {
  page: PageRecord;
  isLocal: boolean;
  city: ReturnType<typeof getCityByName>;
}) {
  return (
    <div className="lg:col-span-6">
      <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-primary/10 group">
        <Image
          src={HERO_IMG}
          alt={
            isLocal && city
              ? `${page.service} on a residential lawn in ${city.name}`
              : `${page.service} for Canadian properties`
          }
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <HeroPills />
      </div>
    </div>
  );
}

function HeroPills() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface/90 text-xs font-semibold text-primary backdrop-blur">
          <Icon name="electric_moped" size={14} className="text-secondary" />
          Quiet electric fleet
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface/90 text-xs font-semibold text-primary backdrop-blur">
          <Icon name="eco" size={14} className="text-secondary" />
          Organic-forward
        </span>
      </div>
    </>
  );
}

function PageWidth({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">{children}</div>
  );
}

function buildBreadcrumbs(
  page: PageRecord,
  city: ReturnType<typeof getCityByName>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  if (page.pageType === "City × Service" && city) {
    items.push({ label: "Cities", href: "/cities" });
    items.push({ label: city.name, href: `/${city.slug}` });
    items.push({ label: page.service });
    return items;
  }
  items.push({ label: "Services", href: "/services" });
  items.push({ label: page.service });
  return items;
}

function LocalLinksSection({
  pillarHref,
  page,
  city,
  siblingLinks,
}: {
  pillarHref: string;
  page: PageRecord;
  city: NonNullable<ReturnType<typeof getCityByName>>;
  siblingLinks: { href: string; label: string }[];
}) {
  return (
    <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
      <h2 className="text-2xl font-extrabold text-primary mb-4">
        More lawn care in {city.name}
      </h2>
      <RelatedPills pillarHref={pillarHref} page={page} city={city} />
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {siblingLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center justify-between min-h-11 p-4 rounded-xl bg-surface-container-lowest border border-primary-container/5 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-primary group-hover:text-secondary line-clamp-2">
                {link.label}
              </span>
              <Icon name="arrow_forward" size={18} className="text-outline shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedPills({
  pillarHref,
  page,
  city,
}: {
  pillarHref: string;
  page: PageRecord;
  city: { name: string; slug: string };
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={pillarHref}
        className="min-h-11 inline-flex items-center px-4 py-2 rounded-full bg-surface-container-high text-sm font-semibold text-primary hover:bg-secondary-container/50"
      >
        {page.keyword} across Canada
      </Link>
      <Link
        href={`/${city.slug}`}
        className="min-h-11 inline-flex items-center px-4 py-2 rounded-full bg-surface-container-high text-sm font-semibold text-primary hover:bg-secondary-container/50"
      >
        All services in {city.name}
      </Link>
    </div>
  );
}
