import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

const SKIP_EXTENSIONS = new Set(['.md', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif']);

export function syncProjectMedia(): AstroIntegration {
  return {
    name: 'sync-project-media',
    hooks: {
      'astro:config:setup': () => {
        const dataDir = fileURLToPath(new URL('../data/projects', import.meta.url));
        const publicDir = fileURLToPath(new URL('../public', import.meta.url));

        if (!existsSync(dataDir)) return;

        for (const slug of readdirSync(dataDir)) {
          const projectDir = join(dataDir, slug);
          if (!statSync(projectDir).isDirectory()) continue;

          for (const file of readdirSync(projectDir)) {
            if (SKIP_EXTENSIONS.has(extname(file).toLowerCase())) continue;

            const destDir = join(publicDir, 'projects', slug);
            mkdirSync(destDir, { recursive: true });
            copyFileSync(join(projectDir, file), join(destDir, file));
          }
        }
      },
    },
  };
}
