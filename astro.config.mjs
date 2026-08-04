// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://guillaumebielli.fr",
  base: "/",
  trailingSlash: "never",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "blog/configurer-la-mesure-hybride-piwik-pro-avec-une-cmp-custom": {
      destination: "/blog/configurer-la-mesure-hybride-piwik-pro",
      status: 301,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
    },
  },
  integrations: [
    mdx({
      extendMarkdownConfig: true,
      gfm: true,
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
