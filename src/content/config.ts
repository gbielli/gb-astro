import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      author: z.string(),
      image: image(),
      categories: z.array(z.string()),
    }),
});

export const collections = { articles };
