import Image from "next/image";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Icon } from "@/components/Icon";
import { ServiceNavigator } from "@/components/ServiceNavigator";
import { climateFeatures, describeService, processSteps, seasonalPrograms } from "@/lib/page-copy";
import { PHONE_DISPLAY, PHONE_HREF, cities, services, type ServiceRecord } from "@/lib/site-data";

const HERO =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

const testimonials = [
  {
    quote:
      "Living near the lake in Oakville, we fight crabgrass every spring. Our lawn finally looks like a fairway — and the electric mowers never wake the baby.",
    name: "Julian & Claire M.",
    loc: "Oakville, ON",
    initials: "JM",
  },
  {
    quote:
      "Calgary chinooks and clay usually fry our grass by July. Deep aeration and organic feeding saved the yard — best money we spent on the exterior this year.",
    name: "Brenton T.",
    loc: "Calgary, AB",
    initials: "BT",
  },
  {
    quote:
      "Two golden retrievers and we were scared of weed sprays. Canada Lawn Care uses pet-safe bio products — the chafer beetles were gone in weeks.",
    name: "Sarah-Lin L.",
    loc: "North Vancouver, BC",
    initials: "SL",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden pb-space-xl">
        <div className="absolute -top-32 right-1/4 w-[640px] h-[640px] bg-secondary-fixed/20 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter pt-4 lg:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-secondary-container/40 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                SPRING SLOTS FILLING FAST IN THE GTA, CALGARY &amp; VANCOUVER
              </div>
              <h1 className="text-4xl lg:text-[56px] text-primary font-extrabold tracking-tight leading-[1.08]">
                Canada’s healthiest lawns,{" "}
                <span className="text-secondary">tailored for northern climates.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Quiet electric mowing, organic-forward treatments, and seasonal programs built for
                Canada’s freeze-thaw cycles. Find care in your city in three clicks.
              </p>
              <ServiceNavigator />
              <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
                <span className="inline-flex items-center gap-1">
                  <Icon name="eco" size={16} className="text-secondary" />
                  100% guaranteed safe organic options
                </span>
                <a href={PHONE_HREF} className="inline-flex items-center gap-1 font-semibold text-primary">
                  <Icon name="call" size={16} className="text-secondary" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <Image
                  src={HERO}
                  alt="Manicured Canadian residential lawn"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-black/10" />
                <div className="absolute top-4 right-4 backdrop-blur-md bg-surface/90 rounded-2xl p-3 shadow-lg flex gap-3 items-center">
                  <Icon name="electric_moped" size={24} className="text-secondary" />
                  <div>
                    <p className="text-sm font-bold text-primary">Quiet electric fleet</p>
                    <p className="text-xs text-on-surface-variant">Neighbourhood-friendly visits</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  ["15,000+", "Lawns revitalized"],
                  ["0 L", "Gasoline burned"],
                  ["99.4%", "Annual renewal"],
                ].map(([n, l]) => (
                  <div key={l} className="p-3 bg-surface-container-low rounded-xl text-center">
                    <span className="text-lg font-bold text-primary block">{n}</span>
                    <span className="text-[10px] uppercase text-on-surface-variant tracking-wide">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionHeader
        kicker="Engineered for extreme northern climates"
        title="Why standard U.S. lawn formulas fail in Canada."
        aside="Ice sheets, clay compaction, and grub cycles demand Canadian-specific playbooks."
      />
      <section className="pb-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {climateFeatures.map((f) => (
            <article
              key={f.title}
              className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary-container/40 flex items-center justify-center mb-4">
                <Icon name={f.icon} size={30} className="text-secondary" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                {f.tag}
              </span>
              <h3 className="font-bold text-primary my-2">{f.title}</h3>
              <p className="text-sm text-on-surface-variant">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <SectionHeader
        kicker="Full-service lawn care"
        title="Every season. Every major Canadian city."
        aside="From weekly mowing to aeration, overseeding, and commercial grounds — choose what your property needs."
      />
      <section className="pb-space-xl bg-surface" id="seasonal">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.slice(0, 12).map((s) => (
            <ServiceTile key={s.slug} service={s} />
          ))}
        </div>
        <p className="text-center mt-6">
          <Link href="/services" className="text-secondary font-semibold text-sm">
            View all services →
          </Link>
        </p>
      </section>

      <SectionHeader
        kicker="Seasonal programs"
        title="Three-season rhythm for Canadian turf."
        aside="Spring recovery, summer growth, and fall root-building — bundled the way Canadian lawns actually grow."
      />
      <section className="pb-space-xl bg-surface-container-low" id="commercial">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter grid md:grid-cols-3 gap-4">
          {seasonalPrograms.map((p, i) => (
            <SeasonCard key={p.name} program={p} featured={i === 1} />
          ))}
        </div>
      </section>

      <section className="py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Proven northern results
            </span>
            <h2 className="text-3xl font-extrabold text-primary mt-2">
              From winter damage to architectural velvet.
            </h2>
            <p className="text-on-surface-variant mt-3 text-sm">
              Drag the slider to see what six weeks of boreal-season care can do after a hard winter.
            </p>
          </div>
          <div className="lg:col-span-7">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <SectionHeader
        kicker="Precision workflow"
        title="The 5-step Canadian climate formula."
        aside="No guesswork — we measure, treat, and document every visit."
      />
      <section className="pb-space-xl bg-surface" id="process">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter grid md:grid-cols-5 gap-4">
          {processSteps.map((step) => (
            <div
              key={step.n}
              className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-lg transition-all"
            >
              <div className="flex justify-between mb-2">
                <span className="text-3xl font-black text-secondary/30">{step.n}</span>
                <Icon name={step.icon} size={20} className="text-secondary" />
              </div>
              <h4 className="font-bold text-primary text-sm mb-1">{step.title}</h4>
              <p className="text-xs text-on-surface-variant">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
          <h2 className="text-3xl font-extrabold text-primary mb-6">Trusted from coast to coast</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <article key={t.name} className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm">
                <p className="text-sm italic text-on-surface mb-4">“{t.quote}”</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-fixed font-bold flex items-center justify-center text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{t.name}</p>
                    <p className="text-xs text-on-surface-variant">{t.loc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {cities.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-semibold"
              >
                {c.name}, {c.province}
              </Link>
            ))}
            <Link href="/cities" className="px-3 py-1 text-secondary text-xs font-bold">
              All cities →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter">
          <div className="rounded-3xl bg-primary-container text-on-primary p-8 md:p-12 relative overflow-hidden grid lg:grid-cols-2 gap-8 items-center">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Ready for the best lawn on your street?
              </h2>
              <p className="text-on-primary-container text-sm max-w-md">
                Pick your province, city, and service — or call{" "}
                <strong className="text-white">{PHONE_DISPLAY}</strong> and we’ll walk you through
                what’s available in your neighbourhood.
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-secondary text-on-secondary font-semibold text-sm"
              >
                <Icon name="call" size={18} />
                {PHONE_DISPLAY}
              </a>
            </div>
            <div className="relative z-10 bg-surface rounded-2xl p-4 text-on-surface">
              <ServiceNavigator compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside: string;
}) {
  return (
    <div className="pt-space-xl max-w-7xl mx-auto px-gutter-mobile md:px-gutter flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
          {kicker}
        </span>
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">{title}</h2>
      </div>
      <p className="text-on-surface-variant max-w-md text-sm">{aside}</p>
    </div>
  );
}

function ServiceTile({ service }: { service: ServiceRecord }) {
  return (
    <Link
      href={service.slug}
      className="p-5 rounded-2xl bg-surface-container-lowest border border-primary-container/5 hover:shadow-lg block group"
    >
      <h3 className="font-bold text-primary group-hover:text-secondary">{service.topic}</h3>
      <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">
        {describeService(service.topic)}
      </p>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary mt-3">
        Learn more <Icon name="arrow_forward" size={14} />
      </span>
    </Link>
  );
}

function SeasonCard({
  program,
  featured,
}: {
  program: (typeof seasonalPrograms)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-3xl border border-primary-container/5 ${
        featured ? "bg-secondary-container/30 shadow-lg" : "bg-surface-container-lowest"
      }`}
    >
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
    </div>
  );
}

