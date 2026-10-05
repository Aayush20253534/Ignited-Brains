import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...blogPosts.map(post => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00+05:30`),
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
