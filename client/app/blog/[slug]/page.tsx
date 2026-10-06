import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { PostCard, PostMeta } from "@/components/blog/post-card";
import { ArticleContent } from "@/components/blog/article-content";
import { BlogExposure } from "@/components/blog/blog-exposure";
import { EarthCta } from "@/components/layout/earth-cta";
import { ButtonLink } from "@/components/ui";
import { getPublicBlog, getPublicBlogs } from "@/lib/blog-server";
import { articleHeadings, imageIsUpload } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import styles from "@/components/blog/blog.module.css";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublicBlog((await params).slug);
  if (!post) notFound();
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return { title, description, keywords: post.tags, alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title, description, url: `/blog/${post.slug}`, publishedTime: post.publishedAt || undefined, modifiedTime: post.updatedAt, authors: [post.author], section: post.category, tags: post.tags, images: [{ url: post.image, alt: post.imageAlt }] },
    twitter: { card: "summary_large_image", title, description, images: [post.image] } };
}
export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicBlog(slug);
  if (!post) notFound();
  if (post.slug !== slug) permanentRedirect(`/blog/${post.slug}`);
  const related = (await getPublicBlogs("limit=4")).data.filter(item => item.id !== post.id).slice(0, 3);
  const headings = articleHeadings(post.content);
  const schema = [{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: `${siteConfig.url}${post.image}`, datePublished: post.publishedAt, dateModified: post.updatedAt,
    author: { "@type": post.author === siteConfig.name ? "Organization" : "Person", name: post.author }, publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/media/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${post.slug}` }, articleSection: post.category, keywords: post.tags.join(", "), inLanguage: "en-IN", timeRequired: `PT${post.readTime}M` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` }] }];
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <BlogExposure id={post.id} kind="VIEW" source="ARTICLE" />
    <article>
      <header className={`${styles.container} ${styles.articleHeader}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{post.category}</span></nav>
        <p className={styles.category}>{post.category}</p><h1>{post.title}</h1><p className={styles.articleDeck}>{post.excerpt}</p>
        <div className={styles.author}><span className={styles.authorMark} aria-hidden="true">IB</span><span>{post.author}</span><PostMeta post={post} /></div>
      </header>
      <figure className={`${styles.container} ${styles.articleFigure}`}><div className={styles.articleImage}><Image src={post.image} alt={post.imageAlt} fill preload unoptimized={imageIsUpload(post.image)} sizes="(max-width: 767px) 90vw, 1200px" /></div>{post.imageCaption && <figcaption>{post.imageCaption}</figcaption>}</figure>
      <div className={`${styles.container} ${styles.articleLayout}`}>
        <aside className={styles.toc} aria-labelledby="on-this-page"><p id="on-this-page">In this article</p><nav aria-label="Article contents"><ol>{headings.map((heading, index) => <li key={heading.id}><a href={`#${heading.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{heading.title}</a></li>)}</ol></nav><Link href="/blog" className={styles.textLink}>All articles <span aria-hidden="true">←</span></Link></aside>
        <div><ArticleContent content={post.content} /><Link href="/blog" className={styles.textLink}>Back to the journal <span aria-hidden="true">←</span></Link></div>
      </div>
    </article>
    {!!related.length && <section className={styles.related} aria-labelledby="related-title"><div className={styles.container}><p className={styles.eyebrow}>Keep exploring</p><h2 id="related-title">More ideas for <em>curious minds.</em></h2><div className={styles.grid}>{related.map(item => <PostCard key={item.id} post={item} source="RELATED" />)}</div></div></section>}
    <EarthCta eyebrow="From ideas to experiences" title={<>Bring hands-on learning<br />to your school.</>} description={<>Explore Space, STEM, AI and Robotics environments designed around curiosity and making.</>} actions={<ButtonLink href="/solutions" size="lg" showArrow>Explore Solutions</ButtonLink>} />
  </main>;
}
