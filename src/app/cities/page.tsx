import Link from "next/link";
import type { Metadata } from "next";
import { AboveFoldCta } from "@/components/seo/AboveFoldCta";
import { canonicalUrl } from "@/lib/seo/metadata";
import { BRAND } from "@/lib/seo/constants";
import { getCitiesByProvince } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Lawn Care Cities Canada | ${BRAND}`,
  description:
    "Find lawn care in Toronto, Vancouver, Calgary, Ottawa, Montreal, Halifax, and 38 more Canadian cities. Call 1-800-CAN-LAWN today.",
  alternates: { canonical: canonicalUrl("/cities") },
};

export default function CitiesPage() {
  const byProvince = getCitiesByProvince();
  const provinces = Object.keys(byProvince).sort();

  return (
    <div className="pb-space-xl">
      <section className="relative overflow-hidden pt-2 pb-10 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Where we work</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">Lawn care in your city</h1>
          <p className="text-on-surface-variant mt-3 max-w-xl text-sm md:text-base">
            Local crews in 44 metros — choose your city for services, seasonal timing, and FAQs.
          </p>
          <div className="mt-4">
            <AboveFoldCta secondaryHref="/services" secondaryLabel="All services" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter flex flex-col gap-12 pt-8">
        {provinces.map((prov) => (
          <section key={prov}>
            <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-outline-variant/30">
              {prov}
            </h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {byProvince[prov].map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="block p-4 rounded-xl bg-surface-container-lowest border border-primary-container/5 hover:shadow-md hover:border-secondary/30 transition-all min-h-11"
                  >
                    <span className="font-bold text-primary">Lawn care {city.name}</span>
                    {city.note && (
                      <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">{city.note}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
