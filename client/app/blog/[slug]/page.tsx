import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard, PostMeta } from "@/components/blog/post-card";
import { EarthCta } from "@/components/layout/earth-cta";
import { ButtonLink } from "@/components/ui";
import { blogPosts, getBlogPost } from "@/data/blog";
import { blogSummary } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import styles from "@/components/blog/blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return {
    title: post.title, description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, publishedTime: `${post.date}T00:00:00+05:30`, authors: [siteConfig.name], section: post.category, images: [{ url: post.image, alt: post.alt }] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const summary = blogSummary(post);
  const related = blogPosts.filter(item => item.slug !== slug).slice(0, 3);
  const schema = [
    {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: post.title, description: post.excerpt, image: `${siteConfig.url}${post.image}`,
      datePublished: `${post.date}T00:00:00+05:30`, dateModified: `${post.date}T00:00:00+05:30`,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/media/logo.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${post.slug}` },
      articleSection: post.category, inLanguage: "en-IN", timeRequired: `PT${summary.readTime}M`,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` }],
    },
  ];
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <article>
      <header className={`${styles.container} ${styles.articleHeader}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{post.category}</span></nav>
        <p className={styles.category}>{post.category}</p>
        <h1>{post.title}</h1>
        <p className={styles.articleDeck}>{post.excerpt}</p>
        <div className={styles.author}><span className={styles.authorMark} aria-hidden="true">IB</span><span>Ignited Brains</span><PostMeta post={summary} /></div>
      </header>
      <figure className={`${styles.container} ${styles.articleFigure}`}>
        <div className={`${styles.articleImage} ${post.image.includes("hands-on-bridge") || post.image.includes("ai-object-sorting") ? styles.wideImage : ""}`}><Image src={post.image} alt={post.alt} fill preload sizes="(max-width: 767px) 90vw, 1200px" /></div>
        <figcaption>{post.imageCaption}</figcaption>
      </figure>
      <div className={`${styles.container} ${styles.articleLayout}`}>
        <aside className={styles.toc} aria-labelledby="on-this-page"><p id="on-this-page">In this article</p><nav aria-label="Article contents"><ol>{post.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span aria-hidden="true">0{index + 1}</span>{section.title}</a></li>)}</ol></nav><Link href="/blog" className={styles.textLink}>All articles <span aria-hidden="true">←</span></Link></aside>
        <div className={styles.prose}>
          <p className={styles.introduction}>{post.introduction}</p>
          {post.sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.steps && <ul>{section.steps.map(step => <li key={step}>{step}</li>)}</ul>}</section>)}
          <aside className={styles.takeaway}><p className={styles.eyebrow}>Put it into practice</p><p>{post.takeaway}</p></aside>
          <section className={styles.resources} aria-labelledby="further-reading"><h2 id="further-reading">Further reading</h2><p>Explore these teaching resources alongside this guide.</p><ul>{post.resources.map(resource => <li key={resource.href}><a href={resource.href}>{resource.label}<span aria-hidden="true"> ↗</span></a></li>)}</ul></section>
          <Link href="/blog" className={styles.textLink}>Back to the journal <span aria-hidden="true">←</span></Link>
        </div>
      </div>
    </article>
    <section className={styles.related} aria-labelledby="related-title"><div className={styles.container}><p className={styles.eyebrow}>Keep exploring</p><h2 id="related-title">More ideas for <em>curious minds.</em></h2><div className={styles.grid}>{related.map(item => <PostCard key={item.slug} post={blogSummary(item)} />)}</div></div></section>
    <EarthCta eyebrow="From ideas to experiences" title={<>Bring hands-on learning<br />to your school.</>} description={<>Explore Space, STEM, AI and Robotics environments designed around curiosity and making.</>} actions={<ButtonLink href="/solutions" size="lg" showArrow>Explore Solutions</ButtonLink>} />
  </main>;
}
