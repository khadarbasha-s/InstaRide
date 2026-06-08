import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import { formatDate, parseJsonArray } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const revalidate = 300;

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = await prisma.blog.findUnique({ where: { slug } });
  if (!b) return {};
  return {
    title: b.seoTitle || b.title,
    description: b.seoDesc || b.excerpt,
    alternates: { canonical: `/fastrental-blog/${b.slug}` },
    openGraph: { images: [b.coverImage] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog || !blog.isPublished) notFound();
  const tags = parseJsonArray(blog.tagsJson);
  const safe = sanitizeHtml(blog.content);

  const related = await prisma.blog.findMany({
    where: { isPublished: true, id: { not: blog.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <article>
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="container max-w-3xl py-10 lg:py-14">
        <div className="text-sm text-neutral-500 mb-3">
          {blog.publishedAt && <span>{formatDate(blog.publishedAt)} · </span>}
          {blog.authorName}
        </div>
        <h1 className="text-brand-black mb-4">{blog.title}</h1>
        <p className="text-lg text-neutral-700 leading-relaxed mb-8">
          {blog.excerpt}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t) => (
              <Badge key={t} variant="muted">
                {t}
              </Badge>
            ))}
          </div>
        )}
        <div
          className="prose-fastrental"
          dangerouslySetInnerHTML={{ __html: safe }}
        />
      </div>

      {related.length > 0 && (
        <section className="bg-brand-gray-bg py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/fastrental-blog/${r.slug}`}
                  className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="relative aspect-[16/9] bg-neutral-100">
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-brand-black leading-tight">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
