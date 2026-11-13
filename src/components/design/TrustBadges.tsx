import { Icon } from "../Icon";

const BADGES = [
  { icon: "electric_moped", label: "Quiet electric fleet" },
  { icon: "eco", label: "Organic-forward options" },
  { icon: "photo_camera", label: "Photo visit scorecards" },
  { icon: "verified", label: "Licensed where required" },
] as const;

export function TrustBadges() {
  return (
    <ul className="space-y-3">
      {BADGES.map((b) => (
        <li
          key={b.label}
          className="flex items-center gap-3 p-3 rounded-xl bg-secondary-container/25 border border-primary-container/5"
        >
          <Icon name={b.icon} size={22} className="text-secondary shrink-0" />
          <span className="text-sm font-semibold text-primary">{b.label}</span>
        </li>
      ))}
    </ul>
  );
}
