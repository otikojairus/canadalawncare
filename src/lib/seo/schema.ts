import type { BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import type { FaqItem } from "./content";
import type { CityRecord, PageRecord } from "../site-data";
import { BRAND, PHONE_E164, SITE_URL } from "./constants";

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function localBusinessSchema(city: CityRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND,
    telephone: `+${PHONE_E164}`,
    url: SITE_URL,
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.province,
        addressCountry: "CA",
      },
    },
    description: `Lawn mowing, aeration, fertilization, and seasonal programs in ${city.name}, ${city.province}.`,
  };
}

export function serviceSchema(page: PageRecord, city?: CityRecord) {
  const area = city ? `${city.name}, ${city.province}` : "Canada";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.service,
    serviceType: page.keyword,
    provider: {
      "@type": "LocalBusiness",
      name: BRAND,
      telephone: `+${PHONE_E164}`,
    },
    areaServed: area,
    description: page.keyword,
  };
}
