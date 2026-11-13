import enrichmentRaw from "../../data/city-enrichment.json";

export type CityEnrichment = {
  population: string;
  climate: string;
  landmark: string;
  neighbourhoods: string[];
  hardiness: string;
};

const enrichment = enrichmentRaw as Record<string, CityEnrichment>;

export function getCityEnrichment(slug: string): CityEnrichment | undefined {
  return enrichment[slug];
}
