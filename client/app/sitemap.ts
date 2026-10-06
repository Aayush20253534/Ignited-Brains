import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { getBlogSitemap } from "@/lib/blog-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogSitemap();
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/solutions`,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/solutions/space-lab`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...["stem-lab", "ai-robotics-lab", "science-park"].map(slug => ({
      url: `${siteConfig.url}/solutions/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${siteConfig.url}/schools`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/media`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...posts.map(post => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      images: [`${siteConfig.url}${post.image}`],
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/shop`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
