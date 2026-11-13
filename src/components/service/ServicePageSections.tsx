import type { ContentSection } from "@/lib/seo/content";
import type { PageRecord } from "@/lib/site-data";
import { SectionHeader } from "../design/SectionHeader";
import { FeatureCard } from "../design/FeatureCard";
import { ProcessSteps } from "../design/ProcessSteps";
import { TrustBadges } from "../design/TrustBadges";
import { Icon } from "../Icon";
import { seasonalPrograms } from "@/lib/page-copy";

const PARAGRAPH_ICONS = ["grass", "science", "layers", "eco", "bug_report", "handyman"] as const;

type Props = {
  sections: ContentSection[];
  page: PageRecord;
  isLocal: boolean;
};

export function ServicePageSections({ sections, page, isLocal }: Props) {
  if (!sections.length) return null;

  return (
    <div className="flex flex-col">
      {sections.map((section, index) => (
        <SectionBlock
          key={`${section.heading}-${index}`}
          section={section}
          page={page}
          isLocal={isLocal}
          index={index}
        />
      ))}
    </div>
  );
}

function SectionBlock({
  section,
  page,
  isLocal,
  index,
}: {
  section: ContentSection;
  page: PageRecord;
  isLocal: boolean;
  index: number;
}) {
  const kind = resolveLayout(section.heading);
  const bg = index % 2 === 0 ? "bg-surface-container-low" : "bg-surface";

  return (
    <section className={`py-space-xl ${bg}`}>
      <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
        {kind === "overview" && (
          <OverviewSection section={section} service={page.service} />
        )}
        {kind === "seasonal" && <SeasonalSection section={section} />}
        {kind === "features" && (
          <FeaturesSection section={section} service={page.service} isLocal={isLocal} />
        )}
        {kind === "checklist" && <ChecklistSection section={section} />}
        {kind === "process" && <ProcessSection section={section} />}
        {kind === "split" && <SplitSection section={section} keyword={page.keyword} />}
      </div>
    </section>
  );
}

function resolveLayout(heading: string): string {
  const h = heading.toLowerCase();
  if (h.includes("overview") || h.includes("about lawn")) return "overview";
  if (h.includes("seasonal")) return "seasonal";
  if (h.includes("booking") || h.includes("how we work")) return "process";
  if (h.includes("visit") || h.includes("standard")) return "checklist";
  if (h.includes("residential") || h.includes("regional")) return "split";
  return "features";
}

function OverviewSection({ section, service }: { section: ContentSection; service: string }) {
  const [lead, ...rest] = section.paragraphs;
  return (
    <>
      <SectionHeader
        kicker="Program overview"
        title={section.heading}
        aside={`What ${service.toLowerCase()} looks like from first visit through the season.`}
      />
      <OverviewGrid lead={lead} rest={rest} />
    </>
  );
}

function OverviewGrid({ lead, rest }: { lead: string | undefined; rest: string[] }) {
  return (
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          {lead && (
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">{lead}</p>
          )}
          {rest.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm text-on-surface-variant leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-surface-container-lowest border border-primary-container/5 p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">
              On every route
            </p>
            <TrustBadges />
          </div>
        </div>
      </div>
  );
}

function SeasonalSection({ section }: { section: ContentSection }) {
  const extras = section.paragraphs;
  return (
    <>
      <SectionHeader
        kicker="Seasonal rhythm"
        title={section.heading}
        aside="Canadian lawns grow in three distinct acts — we schedule visits to match."
        align="center"
      />
      <div className="grid md:grid-cols-3 gap-4">
        {seasonalPrograms.map((program, i) => (
          <div
            key={program.name}
            className={`p-6 rounded-3xl border border-primary-container/5 ${
              i === 1 ? "bg-secondary-container/30 shadow-lg md:-translate-y-1" : "bg-surface-container-lowest shadow-sm"
            }`}
          >
            <SeasonProgramHead program={program} />
            {extras[i] && (
              <p className="text-xs text-on-surface-variant mt-3 pt-3 border-t border-outline-variant/30">
                {extras[i]}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function SeasonProgramHead({ program }: { program: (typeof seasonalPrograms)[number] }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Icon name={program.icon} size={22} className="text-secondary" />
        <span className="text-xs font-bold uppercase text-primary">{program.badge}</span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-3">{program.name}</h3>
      <ul className="space-y-2">
        {program.items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-on-surface-variant">
            <Icon name="check_circle" size={18} className="text-secondary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function FeaturesSection({
  section,
  service,
  isLocal,
}: {
  section: ContentSection;
  service: string;
  isLocal: boolean;
}) {
  return (
    <>
      <SectionHeader
        kicker={isLocal ? "Local expertise" : "Why it matters"}
        title={section.heading}
        aside={`How we deliver ${service.toLowerCase()} on Canadian lawns — not copy-paste southern playbooks.`}
      />
      <FeatureGrid section={section} />
    </>
  );
}

function FeatureGrid({ section }: { section: ContentSection }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {section.paragraphs.map((p, i) => {
        const title = sentenceTitle(p);
        const icon = PARAGRAPH_ICONS[i % PARAGRAPH_ICONS.length];
        return (
          <FeatureCard
            key={p.slice(0, 32)}
            icon={icon}
            tag={i === 0 ? "Primary focus" : `Point ${i + 1}`}
            title={title}
            body={p}
          />
        );
      })}
    </div>
  );
}

function ChecklistSection({ section }: { section: ContentSection }) {
  return (
    <>
      <SectionHeader kicker="Visit standards" title={section.heading} />
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <ul className="space-y-3">
          {section.paragraphs.map((p) => (
            <li
              key={p.slice(0, 40)}
              className="flex gap-3 p-4 rounded-xl bg-surface-container-lowest border border-primary-container/5"
            >
              <Icon name="check_circle" size={22} className="text-secondary shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface-variant leading-relaxed">{p}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl bg-primary-container text-on-primary p-6 md:p-8">
          <Icon name="shield_with_heart" size={32} className="text-secondary-fixed mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">True North guarantee</h3>
          <p className="text-sm text-on-primary-container leading-relaxed">
            Documented visits, photo scorecards, and re-treat commitments where weed control is on
            your program.
          </p>
        </div>
      </div>
    </>
  );
}

function ProcessSection({ section }: { section: ContentSection }) {
  const caption = section.paragraphs[0];
  return (
    <>
      <SectionHeader
        kicker="Precision workflow"
        title={section.heading}
        aside="The same five-step formula on every property."
        align="center"
      />
      <ProcessSteps caption={caption} />
      {section.paragraphs.slice(1).map((p) => (
        <p key={p.slice(0, 40)} className="mt-6 text-sm text-on-surface-variant max-w-3xl mx-auto text-center">
          {p}
        </p>
      ))}
    </>
  );
}

function SplitSection({ section, keyword }: { section: ContentSection; keyword: string }) {
  const [a, b] = section.paragraphs;
  return (
    <>
      <SectionHeader title={section.heading} aside={`${keyword} for homes, strata, and commercial sites.`} />
      <div className="grid md:grid-cols-2 gap-4">
        {a && <SplitPanel icon="home" title="Residential" body={a} />}
        {b && <SplitPanel icon="apartment" title="Commercial & strata" body={b} />}
        {section.paragraphs.slice(2).map((p) => (
          <div key={p.slice(0, 40)} className="md:col-span-2 p-5 rounded-2xl bg-surface-container-lowest border border-primary-container/5">
            <p className="text-sm text-on-surface-variant">{p}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SplitPanel({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <article className="p-6 rounded-2xl bg-surface-container-lowest border border-primary-container/5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Icon name={icon} size={24} className="text-secondary" />
        <h3 className="font-bold text-primary">{title}</h3>
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
    </article>
  );
}

function sentenceTitle(paragraph: string): string {
  const first = paragraph.split(/[.!?]/)[0]?.trim() ?? paragraph;
  if (first.length <= 56) return first;
  return first.slice(0, 53) + "…";
}
