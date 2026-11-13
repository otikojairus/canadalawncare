import Link from "next/link";
import { Icon } from "../Icon";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-on-surface-variant mb-4">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <Icon name="chevron_right" size={16} className="text-outline" aria-hidden />
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary font-medium">
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
