export function SectionHeader({
  kicker,
  title,
  aside,
  align = "left",
}: {
  kicker?: string;
  title: string;
  aside?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-3 mb-8 ${
        centered ? "text-center items-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {kicker && (
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
            {kicker}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">{title}</h2>
      </div>
      {aside && (
        <p className={`text-sm text-on-surface-variant max-w-md ${centered ? "" : "md:pb-0.5"}`}>
          {aside}
        </p>
      )}
    </div>
  );
}
