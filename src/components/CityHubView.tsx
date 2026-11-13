import type { ReactNode } from "react";
import Link from "next/link";
import { ServiceNavigator } from "./ServiceNavigator";
import { Icon } from "./Icon";
import { AboveFoldCta } from "./seo/AboveFoldCta";
import { Breadcrumbs } from "./seo/Breadcrumbs";
import { ServicePageSections } from "./service/ServicePageSections";
import { FaqSection } from "./seo/FaqSection";
import { JsonLd } from "./seo/JsonLd";
import { LocationHighlights } from "./seo/LocationHighlights";
import { buildCityHubContent } from "@/lib/seo/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/seo/schema";
import { describeService } from "@/lib/page-copy";
import { getCityEnrichment } from "@/lib/city-enrichment";
import { getPagesForCity, services, type CityRecord } from "@/lib/site-data";

export function CityHubView({ city }: { city: CityRecord }) {
  const pages = getPagesForCity(city.slug);
  const content = buildCityHubContent(city);
  const e = getCityEnrichment(city.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Cities", href: "/cities" },
    { label: city.name },
  ];

  const schema = [
    breadcrumbSchema(breadcrumbs),
    faqSchema(content.faqs),
    localBusinessSchema(city),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden pt-2 pb-8">
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl -z-10" />
        <CityHero city={city} content={content} e={e} breadcrumbs={breadcrumbs} />
      </section>

      {content.locationFacts.length > 0 && (
        <section className="pb-10">
          <PageWidth>
            <LocationHighlights facts={content.locationFacts} />
          </PageWidth>
        </section>
      )}

      <section className="pb-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Services in {city.name}
              </span>
              <h2 className="text-2xl font-extrabold text-primary mt-1">
                Choose a program
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              20 lawn and grounds services — each page includes local timing and FAQs for {city.name}
              .
            </p>
          </div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32">
                <ServiceNavigator compact />
              </div>
            </div>
            <ServiceList city={city} pages={pages} />
          </div>
        </div>
      </section>

      <ServicePageSections
        sections={content.sections}
        page={{
          title: content.h1,
          slug: `/${city.slug}`,
          keyword: `lawn care ${city.name}`,
          secondaryKeywords: [],
          targetArea: city.name,
          pageType: "City hub",
          service: "Lawn Care Services",
          city: city.name,
          province: city.province,
          priority: city.priority,
          cta: "Call",
          clusterNote: null,
        }}
        isLocal
      />

      <section className="py-10 bg-surface-container-low">
        <PageWidth>
          <h3 className="text-lg font-bold text-primary mb-3">Canada-wide guides</h3>
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.slug}
                  className="inline-flex items-center min-h-11 px-4 py-2 rounded-full bg-surface-container-lowest border border-primary-container/5 text-sm font-semibold text-primary hover:text-secondary hover:shadow-sm"
                >
                  {s.keyword} Canada
                </Link>
              </li>
            ))}
          </ul>
        </PageWidth>
      </section>

      <FaqSection faqs={content.faqs} id={`faq-${city.slug}`} />
    </>
  );
}

function CityHero({
  city,
  content,
  e,
  breadcrumbs,
}: {
  city: CityRecord;
  content: ReturnType<typeof buildCityHubContent>;
  e: ReturnType<typeof getCityEnrichment>;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
      <Breadcrumbs items={breadcrumbs} />
      <div className="mt-4 grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            {city.province} • {e?.population ?? "Metro"} residents
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary">{content.h1}</h1>
          <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
            {content.heroLead}
          </p>
          <AboveFoldCta
            primaryLabel={`Routes in ${city.name} and nearby suburbs`}
            secondaryHref="/services"
            secondaryLabel="All services"
          />
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <StatCard label="Hardiness" value={e?.hardiness ?? "5–6"} icon="thermostat" />
          <StatCard label="Landmark" value={e?.landmark?.split(" ")[0] ?? city.name} icon="location_on" />
          <StatCard
            label="Neighbourhoods"
            value={e?.neighbourhoods?.[0] ?? "Metro core"}
            icon="home_work"
          />
          <StatCard
            label="Climate"
            value={e?.climate?.split(",")[0] ?? "Seasonal turf"}
            icon="cloud"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-surface-container-lowest border border-primary-container/5 shadow-sm">
      <Icon name={icon} size={22} className="text-secondary mb-2" />
      <p className="text-[10px] font-bold uppercase tracking-wide text-outline">{label}</p>
      <p className="text-sm font-bold text-primary line-clamp-2">{value}</p>
    </div>
  );
}

function ServiceList({
  city,
  pages,
}: {
  city: CityRecord;
  pages: ReturnType<typeof getPagesForCity>;
}) {
  return (
    <ul className="lg:col-span-8 order-1 lg:order-2 grid sm:grid-cols-2 gap-3">
      {pages.map((p) => {
        const svc = services.find((s) => s.topic === p.service);
        const label = svc?.keyword ?? p.service;
        return (
          <li key={p.slug}>
            <Link
              href={p.slug}
              className="group h-full flex flex-col p-4 rounded-2xl bg-surface-container-lowest border border-primary-container/5 hover:shadow-lg hover:-translate-y-0.5 transition-all min-h-[7.5rem]"
            >
              <span className="text-sm font-bold text-primary group-hover:text-secondary line-clamp-2">
                {label}
              </span>
              <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 flex-1">
                {describeService(p.service)}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary mt-3">
                View details <Icon name="arrow_forward" size={14} />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function PageWidth({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">{children}</div>
  );
}
