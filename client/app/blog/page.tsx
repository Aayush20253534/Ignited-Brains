import type { Metadata } from "next";
import Link from "next/link";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { EarthCta } from "@/components/layout/earth-cta";
import { ButtonLink } from "@/components/ui";
import { blogPosts } from "@/data/blog";
import { blogSummary } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import styles from "@/components/blog/blog.module.css";

const description = "Practical ideas for STEM education, Space Labs, AI and robotics, student projects and hands-on learning in Indian schools.";

export const metadata: Metadata = {
  title: "Blog | Ideas for Hands-on Education",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", title: "The Ignited Brains Learning Journal", description, url: "/blog", images: [{ url: blogPosts[0].image, width: 1350, height: 1012, alt: blogPosts[0].alt }] },
  twitter: { card: "summary_large_image", title: "The Ignited Brains Learning Journal", description, images: [blogPosts[0].image] },
};

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org", "@type": "Blog",
    name: "The Ignited Brains Learning Journal", description,
    url: `${siteConfig.url}/blog`, publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    blogPost: blogPosts.map(post => ({ "@type": "BlogPosting", headline: post.title, url: `${siteConfig.url}/blog/${post.slug}`, datePublished: post.date, image: `${siteConfig.url}${post.image}` })),
  };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className={styles.hero} aria-labelledby="blog-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div><p className={styles.eyebrow}>Ignited Brains / Blog</p><h1 id="blog-title">Curiosity is the start.<br /><em>Keep exploring.</em></h1></div>
        <div className={styles.heroCopy}><p>Ideas, experiments and practical guides for educators turning classroom concepts into experiences students can build, test and explain.</p><div className={styles.heroLinks}><a href="#articles" className={styles.textLink}>Explore the journal <span aria-hidden="true">↓</span></a><Link href="/projects" className={styles.textLink}>See student projects <span aria-hidden="true">↗</span></Link></div></div>
      </div>
    </section>
    <BlogBrowser posts={blogPosts.map(blogSummary)} />
    <EarthCta eyebrow="Bring ideas to life" title={<>Make the next lesson<br />a moment of discovery.</>} description={<>Create hands-on Space, STEM, AI and Robotics experiences for your students.</>} actions={<ButtonLink href="/contact" size="lg" showArrow>Discuss Your School</ButtonLink>} />
  </main>;
}
