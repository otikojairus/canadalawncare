import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { AboveFoldCta } from "@/components/seo/AboveFoldCta";
import { describeService } from "@/lib/page-copy";
import { canonicalUrl } from "@/lib/seo/metadata";
import { BRAND } from "@/lib/seo/constants";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Lawn Care Services Canada | ${BRAND}`,
  description:
    "Lawn care services across Canada: mowing, aeration, fertilization, weed control, sod, and commercial grounds. Call 1-800-CAN-LAWN for your city.",
  alternates: { canonical: canonicalUrl("/services") },
};

export default function ServicesPage() {
  return (
    <div className="pb-space-xl">
      <section className="relative overflow-hidden pt-2 pb-10 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Our services</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mt-2 max-w-2xl">
            Lawn &amp; grounds care across Canada
          </h1>
          <p className="text-on-surface-variant mt-3 max-w-xl text-sm md:text-base">
            Mowing, aeration, fertilization, and commercial programs — open a service to see national
            coverage and every city we serve.
          </p>
          <div className="mt-4">
            <AboveFoldCta secondaryHref="/cities" secondaryLabel="Find your city" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter pt-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={s.slug}
              className="group p-5 rounded-2xl bg-surface-container-lowest border border-primary-container/5 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col min-h-[10rem]"
            >
              <h2 className="font-bold text-primary group-hover:text-secondary text-lg">{s.topic}</h2>
              <p className="text-sm text-on-surface-variant mt-2 line-clamp-3 flex-1">
                {describeService(s.topic)}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary mt-4">
                Learn more <Icon name="arrow_forward" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
