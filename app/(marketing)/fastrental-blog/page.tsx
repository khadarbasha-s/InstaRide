import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "FastRental Blog — Self Drive Tips, Goa Travel & Car Rental Guides",
  description:
    "Travel guides, Goa destination tips, self drive how-tos and car rental insights from FastRental.",
  alternates: { canonical: "/fastrental-blog" },
};

export default async function BlogIndexPage() {
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-brand-gray-bg py-10 lg:py-14">
        <div className="container">
          <h1 className="text-brand-black mb-3">FastRental Blog</h1>
          <p className="text-neutral-700 max-w-3xl">
            Travel guides, self drive tips, and everything you need to plan a
            great road trip in Goa and beyond.
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container">
          {blogs.length === 0 ? (
            <p className="text-neutral-600">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/fastrental-blog/${b.slug}`}
                  className="group bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <Image
                      src={b.coverImage}
                      alt={b.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    {b.publishedAt && (
                      <div className="text-xs text-neutral-500 mb-2">
                        {formatDate(b.publishedAt)}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-brand-black mb-2 leading-tight group-hover:text-brand-yellow-600 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {b.excerpt}
                    </p>
                    <div className="mt-3 text-xs font-bold text-brand-yellow-600">
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
