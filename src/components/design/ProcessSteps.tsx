import { Icon } from "../Icon";
import { processSteps } from "@/lib/page-copy";

export function ProcessSteps({ caption }: { caption?: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {processSteps.map((step) => (
          <div
            key={step.n}
            className="p-4 md:p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-lg transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-3xl font-black text-secondary/30 leading-none">{step.n}</span>
              <span className="w-9 h-9 rounded-full bg-secondary-container/50 flex items-center justify-center">
                <Icon name={step.icon} size={18} className="text-secondary" />
              </span>
            </div>
            <h3 className="font-bold text-primary text-sm mb-1">{step.title}</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-sm text-on-surface-variant max-w-3xl">{caption}</p>
      )}
    </div>
  );
}
