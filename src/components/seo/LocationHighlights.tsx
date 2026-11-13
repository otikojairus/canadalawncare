import { Icon } from "../Icon";

const ICONS = ["location_on", "thermostat", "nature"] as const;

export function LocationHighlights({ facts }: { facts: string[] }) {
  if (facts.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {facts.slice(0, 3).map((fact, i) => (
        <div
          key={fact}
          className="flex gap-3 p-4 rounded-2xl bg-surface-container-lowest border border-primary-container/5 shadow-sm"
        >
          <div className="shrink-0 w-10 h-10 rounded-xl bg-secondary-container/50 flex items-center justify-center">
            <Icon name={ICONS[i] ?? "info"} size={22} className="text-secondary" />
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-4">{fact}</p>
        </div>
      ))}
    </div>
  );
}
