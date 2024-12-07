import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      render: component("@/components/MarkdocImage.astro"),
    },
  },
});
