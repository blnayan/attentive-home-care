import path from "path";
import type { CollectionConfig } from "payload";

const mediaCollection: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "public", "media"),
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "hero",
        width: 1600,
        height: 900,
        fit: "cover",
      },
      {
        name: "card",
        width: 800,
        height: 600,
        fit: "cover",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export default mediaCollection;
