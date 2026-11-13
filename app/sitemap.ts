import type { MetadataRoute } from "next";

const base = "https://charmainel.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/experience", "/projects", "/blog", "/fun", "/about"].map(
    (p) => ({
      url: `${base}${p}`,
      changeFrequency: "monthly",
      priority: p ? 0.7 : 1,
    }),
  );
}
