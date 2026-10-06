import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, imageIsUpload, type PublicBlogSummary } from "@/lib/blog";
import { BlogExposure } from "./blog-exposure";
import styles from "./blog.module.css";

export function PostMeta({ post }: { post: PublicBlogSummary }) {
  return <p className={styles.meta}><time dateTime={post.publishedAt || undefined}>{formatBlogDate(post.publishedAt)}</time><span aria-hidden="true">/</span><span>{post.readTime} min read</span></p>;
}

export function PostCard({ post, source = "LISTING" }: { post: PublicBlogSummary; source?: "LISTING" | "RELATED" }) {
  return <BlogExposure id={post.id} source={source} className={styles.cardExposure}><article className={styles.card}>
    <Link href={`/blog/${post.slug}`} className={styles.cardImage} aria-label={`Read: ${post.title}`} tabIndex={-1} aria-hidden="true">
      <Image src={post.image} alt={post.imageAlt} fill unoptimized={imageIsUpload(post.image)} sizes="(max-width: 767px) 90vw, (max-width: 1100px) 45vw, 400px" />
    </Link>
    <div className={styles.cardCopy}>
      <p className={styles.category}>{post.category}</p>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <PostMeta post={post} />
      <Link href={`/blog/${post.slug}`} className={styles.textLink} aria-label={`Read article: ${post.title}`}>Read article <span aria-hidden="true">↗</span></Link>
    </div>
  </article></BlogExposure>;
}
