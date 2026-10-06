import Image from "next/image";
import { Children } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import { articleHeadings, imageIsUpload } from "@/lib/blog";
import styles from "./blog.module.css";

export function ArticleContent({ content }: { content: string }) {
  const headings = articleHeadings(content);
  return <div className={styles.prose}>
    <Markdown skipHtml urlTransform={(url, key) => {
      if (key === "src") {
        const upload = /^\/api\/v1\/media\/[0-9a-f-]{36}$/.test(url);
        const asset = /^\/(?:about|admin|applications|blog|contact|home|learning-spaces|media(?:-v2)?|projects(?:-v2)?|schools|shop|solutions|space-lab)\/[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|avif)$/i.test(url) && !url.includes("..") && !url.includes("//");
        return upload || asset ? url : "";
      }
      return defaultUrlTransform(url);
    }} components={{
      h1: ({ children }) => <h2>{children}</h2>,
      h2: ({ node, children }) => <h2 id={headings.find(heading => heading.line === node?.position?.start.line)?.id}>{Children.map(children, child => typeof child === "string" ? child.replace(/\s+\{#[^}]+\}$/, "") : child)}</h2>,
      a: ({ href, children }) => <a href={href} {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>,
      img: ({ src, alt }) => typeof src === "string" && src ? <Image src={src} alt={alt || ""} width={1200} height={800} sizes="(max-width: 767px) 90vw, 800px" unoptimized={imageIsUpload(src)} className={styles.inlineImage} /> : null,
    }}>{content}</Markdown>
  </div>;
}
