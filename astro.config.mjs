// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
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
    sitemap(),
    icon({
      include: {
        "mdi-light": ["*"],
      },
    }),
  ],
});
