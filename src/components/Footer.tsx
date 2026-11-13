import Link from "next/link";
import { Icon } from "./Icon";
import { getCitiesByProvince, services } from "@/lib/site-data";

export function Footer() {
  const byProvince = getCitiesByProvince();
  const topProvinces = Object.keys(byProvince).sort().slice(0, 5);

  return (
    <footer className="w-full bg-surface-container-low pt-space-xl pb-space-lg">
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary-container flex items-center justify-center">
                <Icon name="grass" size={22} className="text-secondary-fixed" />
              </div>
              <span className="text-lg text-primary font-bold">Canada Lawn Care</span>
            </div>
            <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed">
              Sustainable outdoor stewardship and architectural lawn health across Canada.
              Certified organic treatments, quiet electric equipment, and seasonal care built for
              northern climates.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-primary uppercase tracking-wider font-bold">
              Provinces
            </h4>
            <ul className="flex flex-col gap-1 text-sm text-on-surface-variant">
              {topProvinces.map((prov) => (
                <li key={prov}>
                  <Link href="/cities" className="hover:text-primary">
                    {prov} ({byProvince[prov].length} cities)
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-primary uppercase tracking-wider font-bold">
              Core Services
            </h4>
            <ul className="flex flex-col gap-1 text-sm text-on-surface-variant">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug} className="hover:text-primary">
                    {s.topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-primary uppercase tracking-wider font-bold">
              Explore
            </h4>
            <Link
              href="/services"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              All lawn services
            </Link>
            <Link
              href="/cities"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              Cities we serve
            </Link>
            <p className="text-xs text-outline pt-2">
              Need help choosing a service? Call <a href="tel:18002265296" className="text-primary font-semibold">1-800-CAN-LAWN</a>.
            </p>
          </div>
        </div>

        <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant/40">
          <p className="text-sm text-on-surface-variant">
            © {new Date().getFullYear()} Canada Lawn Care. Architectural landscaping & soil ecology.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-xs">
            <Icon name="verified" size={16} className="text-secondary" />
            Landscape Ontario member
          </div>
        </div>
      </div>
    </footer>
  );
}
