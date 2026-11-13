import { climateFeatures } from "@/lib/page-copy";
import { SectionHeader } from "../design/SectionHeader";
import { FeatureCard } from "../design/FeatureCard";

export function NorthernClimateBand() {
  return (
    <section className="py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
        <SectionHeader
          kicker="Engineered for northern climates"
          title="Built for Canadian freeze-thaw cycles"
          aside="Every service page ties back to how we treat snow mold, clay, grubs, and winter dormancy."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {climateFeatures.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              tag={f.tag}
              title={f.title}
              body={f.body}
              meta={f.meta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
