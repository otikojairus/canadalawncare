import type { ContentSection } from "@/lib/seo/content";

export function ContentSections({
  sections,
  skipFirstOverview,
}: {
  sections: ContentSection[];
  /** Hide duplicate overview when shown in a dedicated block */
  skipFirstOverview?: boolean;
}) {
  const list = skipFirstOverview
    ? sections.filter((s, i) => !(i === 0 && s.heading.toLowerCase().includes("overview")))
    : sections;

  if (list.length === 0) return null;

  return (
    <section className="py-space-xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter space-y-10">
        {list.map((section) => (
          <article
            key={section.heading}
            className="rounded-2xl bg-surface-container-lowest border border-primary-container/5 p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-primary mb-4">{section.heading}</h2>
            <div className="space-y-4 max-w-3xl">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
