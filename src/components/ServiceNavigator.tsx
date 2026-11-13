"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { cities, getCitiesByProvince, services } from "@/lib/site-data";

export function ServiceNavigator({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const byProvince = useMemo(() => getCitiesByProvince(), []);
  const provinces = useMemo(() => Object.keys(byProvince).sort(), [byProvince]);

  const [province, setProvince] = useState(provinces[0] ?? "ON");
  const cityList = byProvince[province] ?? [];
  const [citySlug, setCitySlug] = useState(cityList[0]?.slug ?? "");
  const [serviceSlug, setServiceSlug] = useState(
    services[0]?.slug.replace(/^\//, "") ?? "lawn-care-services"
  );

  const handleProvince = (p: string) => {
    setProvince(p);
    const first = byProvince[p]?.[0];
    if (first) setCitySlug(first.slug);
  };

  const go = () => {
    if (!citySlug) return;
    router.push(`/${citySlug}/${serviceSlug}`);
  };

  return (
    <div
      className={`rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary-container/5 flex flex-col gap-3 border border-primary-container/5 ${
        compact ? "p-4" : "p-4 md:p-6"
      }`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm text-primary font-bold flex items-center gap-1.5">
          <Icon name="travel_explore" size={20} className="text-secondary" />
          Find lawn care near you
        </span>
        <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
          Province • City • Service
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
            Province
          </span>
          <select
            value={province}
            onChange={(e) => handleProvince(e.target.value)}
            className="w-full px-3 py-3 rounded-xl bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
            City
          </span>
          <select
            value={citySlug}
            onChange={(e) => setCitySlug(e.target.value)}
            className="w-full px-3 py-3 rounded-xl bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {cityList.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
            Service
          </span>
          <select
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className="w-full px-3 py-3 rounded-xl bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug.replace(/^\//, "")}>
                {s.topic}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={go}
        className="w-full sm:w-auto self-start py-3 px-6 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-secondary transition-all shadow-md inline-flex items-center justify-center gap-1"
      >
        See options in your area
        <Icon name="arrow_forward" size={16} />
      </button>

      <p className="text-xs text-on-surface-variant">
        {services.length} lawn and grounds services in {cities.length} Canadian cities.
      </p>
    </div>
  );
}
