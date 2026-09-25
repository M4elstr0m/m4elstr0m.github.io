export type TagCategory = 'green' | 'cyan' | 'orange';

export interface TagCategories {
  interests: string[];
  stack: string[];
  tools: string[];
}

export const tagColorClasses: Record<TagCategory, string> = {
  green: 'text-tui-green hover:border-tui-green hover:shadow-[0_0_10px_var(--color-tui-green)]',
  cyan: 'text-tui-cyan hover:border-tui-cyan hover:shadow-[0_0_10px_var(--color-tui-cyan)]',
  orange: 'text-tui-orange hover:border-tui-orange hover:shadow-[0_0_10px_var(--color-tui-orange)]',
};

export function categorizeTag(tag: string, categories: TagCategories): TagCategory {
  const normalized = tag.toLowerCase();
  if (categories.stack.some((entry) => entry.toLowerCase() === normalized)) return 'cyan';
  if (categories.tools.some((entry) => entry.toLowerCase() === normalized)) return 'orange';
  return 'green';
}
