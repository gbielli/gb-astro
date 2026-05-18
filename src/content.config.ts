import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      author: z.string(),
      image: image(),
      categories: z.array(z.string()),
      serpDescription: z.string().optional(),
    }),
});

export const collections = { articles };
