import type { FaqItem } from "@/lib/seo/content";

export function FaqSection({ faqs, id = "faq" }: { faqs: FaqItem[]; id?: string }) {
  return (
    <section className="py-space-xl bg-surface-container-low" id={id} aria-labelledby={`${id}-heading`}>
      <div className="max-w-3xl mx-auto px-gutter-mobile md:px-gutter">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Support</span>
        <h2 id={`${id}-heading`} className="text-2xl font-extrabold text-primary mt-1 mb-6">
          Frequently asked questions
        </h2>
        <dl className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl bg-surface-container-lowest border border-primary-container/5 p-5 md:p-6 shadow-sm"
            >
              <dt className="text-base font-bold text-primary">{faq.question}</dt>
              <dd className="mt-2 text-sm text-on-surface-variant leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
