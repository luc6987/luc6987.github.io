// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages user site (repo named luc6987.github.io), so no `base` is needed.
  site: 'https://luc6987.github.io',
  output: 'static',
  // Astro 7 defaults to JSX-style whitespace stripping ('jsx'), which silently drops
  // the space between inline elements written on separate lines. Keep HTML-aware
  // whitespace collapsing so templates behave like plain HTML.
  compressHTML: true,
  markdown: {
    // Code blocks get both palettes as CSS variables; global.css picks one per theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
