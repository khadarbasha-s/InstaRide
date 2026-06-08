import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/data/contact";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();

  const staticRoutes = [
    "",
    "/contact-us",
    "/fastrental-blog",
    "/privacy-policy",
    "/terms",
    "/rental-policy",
    "/goa/self-drive-car-rental-goa",
    "/goa/thar-rental-in-goa",
    "/goa/faqs",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const [cars, blogs, locations] = await Promise.all([
    prisma.car.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.location.findMany({
      select: { slug: true, updatedAt: true },
    }),
  ]);

  return [
    ...staticRoutes,
    ...cars.map((c) => ({
      url: `${base}/rental-car/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogs.map((b) => ({
      url: `${base}/fastrental-blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...locations.map((l) => ({
      url: `${base}/goa/${l.slug}`,
      lastModified: l.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
