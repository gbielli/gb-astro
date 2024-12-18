// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://guillaumebielli.fr",
  base: "/",
  trailingSlash: "never",
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
    },
  },
  integrations: [
    mdx({
      extendMarkdownConfig: true,
      gfm: true,
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap({
      customPages: [
        "https://guillaumebielli.fr/blog/google-analytics-4",
        "https://guillaumebielli.fr/blog/matomo",
      ],
    }),
    icon({
      include: {
        "mdi-light": ["*"],
      },
    }),
  ],
});
