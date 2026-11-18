"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { LAWN_AFTER, LAWN_BEFORE } from "@/lib/lawn-images";

/** Shared crop so both layers frame grass similarly in the slider. */
const SLIDER_IMAGE_CLASS = "object-cover object-center";

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
      <Image
        alt="Freshly mowed lawn with crisp mower stripes"
        src={LAWN_AFTER}
        fill
        className={SLIDER_IMAGE_CLASS}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur text-on-primary text-xs font-bold z-10">
        After (fresh cut)
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
            alt="Tall, shaggy grass before the first mow of the season"
            src={LAWN_BEFORE}
            fill
            className={SLIDER_IMAGE_CLASS}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-on-surface/80 backdrop-blur text-on-primary text-xs font-bold z-10">
            Before (overgrown)
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
        aria-label="Before and after lawn mowing comparison"
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