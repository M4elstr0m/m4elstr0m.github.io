export type TagColor = 'green' | 'cyan' | 'orange' | 'red';

export const tagColorClasses: Record<TagColor, string> = {
  green: 'text-tui-green hover:border-tui-green hover:shadow-[0_0_10px_var(--color-tui-green)]',
  cyan: 'text-tui-cyan hover:border-tui-cyan hover:shadow-[0_0_10px_var(--color-tui-cyan)]',
  orange: 'text-tui-orange hover:border-tui-orange hover:shadow-[0_0_10px_var(--color-tui-orange)]',
  red: 'text-tui-red hover:border-tui-red hover:shadow-[0_0_10px_var(--color-tui-red)]',
};

export function getTagColor(tag: string, colorMap: Record<string, TagColor>): TagColor {
  return colorMap[tag.toLowerCase()] ?? 'red';
}
