import { getEntry } from 'astro:content';

export interface TagMaps {
  tooltipMap: Record<string, string>;
  labelMap: Record<string, string>;
}

export async function getLocalizedTagMaps(locale: string): Promise<TagMaps> {
  const base = await getEntry('taxonomy', 'tags');
  const tooltipMap: Record<string, string> = {};
  const labelMap: Record<string, string> = {};

  for (const entry of base?.data.tags ?? []) {
    tooltipMap[entry.tag.toLowerCase()] = entry.tooltip;
  }

  if (locale === 'fr') {
    const override = await getEntry('taxonomyFr', 'tags');
    for (const entry of override?.data.tags ?? []) {
      const key = entry.tag.toLowerCase();
      if (entry.tooltip) tooltipMap[key] = entry.tooltip;
      if (entry.label) labelMap[key] = entry.label;
    }
  }

  return { tooltipMap, labelMap };
}

export function getTagLabel(tag: string, labelMap: Record<string, string>): string {
  return labelMap[tag.toLowerCase()] ?? tag;
}
