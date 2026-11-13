"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

const AFTER =
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=80";
const BEFORE =
  "https://images.unsplash.com/photo-1605999182823-874e3b1d7a68?auto=format&fit=crop&w=1600&q=80";

export function BeforeAfterSlider() {
  const [value, setValue] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setContainerWidth(el.offsetWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl select-none"
    >
      <Image alt="Healthy emerald lawn after treatment" src={AFTER} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur text-on-primary text-xs font-bold z-10">
        After (Week 6)
      </span>
      <div
        className="absolute top-0 bottom-0 left-0 overflow-hidden"
        style={{ width: `${value}%` }}
      >
        <div
          className="relative h-full"
          style={{ width: containerWidth > 0 ? containerWidth : "100%" }}
        >
          <Image
            alt="Patchy lawn before spring recovery"
            src={BEFORE}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-on-surface/80 backdrop-blur text-on-primary text-xs font-bold z-10">
            Before (post-thaw)
          </span>
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
        style={{ left: `${value}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-primary">
          <Icon name="drag_indicator" size={20} />
        </div>
      </div>
      <input
        aria-label="Before and after comparison"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
    </div>
  );
}
