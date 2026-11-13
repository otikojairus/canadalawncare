import Link from "next/link";
import { Icon } from "../Icon";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/seo/constants";

export function AboveFoldCta({
  primaryLabel = "Call for availability",
  secondaryHref,
  secondaryLabel,
}: {
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`tel:${PHONE_E164}`}
        className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-3 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-secondary transition-colors shadow-sm"
      >
        <Icon name="call" size={18} />
        {PHONE_DISPLAY}
      </a>
      {secondaryHref && secondaryLabel && (
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center min-h-11 px-5 py-3 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-surface-container-low"
        >
          {secondaryLabel}
        </Link>
      )}
      {primaryLabel && (
        <p className="w-full text-xs text-on-surface-variant sm:w-auto sm:self-center">{primaryLabel}</p>
      )}
    </div>
  );
}
