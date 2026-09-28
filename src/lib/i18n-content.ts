import { getEntry, render, type CollectionEntry } from 'astro:content';

export async function renderLocalizedPage(id: string, locale: string) {
  const base = await getEntry('pages', id);
  if (!base) throw new Error(`Missing data/pages/${id}.md`);

  if (locale === 'fr') {
    const override = await getEntry('pagesFr', id);
    if (override) {
      const { Content } = await render(override);
      return { data: { ...base.data, ...override.data }, Content };
    }
  }

  const { Content } = await render(base);
  return { data: base.data, Content };
}

export async function renderLocalizedProject(
  project: CollectionEntry<'projects'>,
  locale: string,
) {
  if (locale === 'fr') {
    const override = await getEntry('projectsFr', project.id);
    if (override) {
      const { Content } = await render(override);
      return { data: { ...project.data, ...override.data }, Content };
    }
  }

  const { Content } = await render(project);
  return { data: project.data, Content };
}

export async function localizedProjectSummary(
  project: CollectionEntry<'projects'>,
  locale: string,
): Promise<string> {
  if (locale === 'fr') {
    const override = await getEntry('projectsFr', project.id);
    if (override?.data.summary) return override.data.summary;
  }
  return project.data.summary;
}
