import Link from "next/link";
import { Icon } from "../Icon";

export function CityLinkGrid({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Coverage</span>
        <h2 className="text-2xl font-extrabold text-primary mt-1 mb-2">{title}</h2>
        <p className="text-sm text-on-surface-variant mb-6 max-w-2xl">{description}</p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center justify-between gap-2 min-h-11 p-4 rounded-xl bg-surface-container-low border border-primary-container/5 hover:bg-surface-container-lowest hover:shadow-md transition-all"
              >
                <span className="text-sm font-semibold text-primary group-hover:text-secondary line-clamp-2">
                  {link.label}
                </span>
                <Icon name="arrow_forward" size={18} className="shrink-0 text-outline group-hover:text-secondary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
