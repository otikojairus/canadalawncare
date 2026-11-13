import { Icon } from "../Icon";

export function FeatureCard({
  icon,
  tag,
  title,
  body,
  meta,
}: {
  icon: string;
  tag?: string;
  title: string;
  body: string;
  meta?: string;
}) {
  return (
    <article className="h-full p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-primary-container/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="w-14 h-14 rounded-2xl bg-secondary-container/40 flex items-center justify-center mb-4">
        <Icon name={icon} size={30} className="text-secondary" />
      </div>
      {tag && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
          {tag}
        </span>
      )}
      <h3 className="font-bold text-primary text-lg mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{body}</p>
      {meta && (
        <p className="mt-4 text-xs font-bold text-secondary">{meta}</p>
      )}
    </article>
  );
}
