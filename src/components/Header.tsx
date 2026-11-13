"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { PHONE_DISPLAY, PHONE_HREF, services } from "@/lib/site-data";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/cities", label: "Cities" },
  { href: "/#seasonal", label: "Seasonal Programs" },
  { href: "/#commercial", label: "Commercial Grounds" },
  { href: "/#process", label: "Our Process" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="w-full bg-primary-container text-on-primary py-1.5 px-gutter-mobile md:px-margin text-center text-xs font-semibold flex items-center justify-center gap-2">
        <Icon name="eco" size={16} className="text-primary-fixed" />
        <span>
          Spring recovery &amp; aeration bookings open across the GTA, Calgary, Vancouver &amp; Ottawa
        </span>
      </div>
      <div className="w-full bg-surface/85 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(20,56,35,0.06)]">
        <div className="h-20 max-w-7xl mx-auto px-gutter-mobile md:px-gutter flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-primary-container flex items-center justify-center">
              <Icon name="grass" size={22} className="text-secondary-fixed" />
            </div>
            <span className="text-lg text-primary tracking-tight font-bold hidden sm:inline">
              Canada Lawn Care
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <div className="relative group">
              <Link
                href="/services"
                className="px-2 py-1.5 text-on-surface-variant hover:text-on-surface inline-flex items-center gap-0.5"
              >
                Services
                <Icon name="expand_more" size={18} />
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col w-64 bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_-4px_rgba(20,56,35,0.12)] p-1 mt-1 z-50 border border-primary-container/5">
                {services.slice(0, 8).map((s) => (
                  <Link
                    key={s.slug}
                    href={s.slug}
                    className="px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-sm"
                  >
                    {s.topic}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="px-3 py-2 rounded-lg text-secondary font-semibold text-sm"
                >
                  View all 20 services →
                </Link>
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1.5 transition-colors ${
                  pathname === link.href
                    ? "text-primary font-bold bg-surface-container-high rounded-full"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PHONE_HREF}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-primary hover:bg-surface-container-low text-sm font-semibold"
            >
              <Icon name="call" size={18} className="text-secondary" />
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/cities"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-surface-tint shadow-sm"
            >
              Find Local Care
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
