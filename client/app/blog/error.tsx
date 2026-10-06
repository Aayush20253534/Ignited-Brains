"use client";
import styles from "@/components/blog/blog.module.css";
export default function BlogError({ reset }: { reset: () => void }) {
  return <main className={styles.page}><div className={`${styles.container} ${styles.empty}`} role="alert"><h1>The learning journal is temporarily unavailable.</h1><p>Please try again in a moment.</p><button type="button" className={styles.primaryButton} onClick={reset}>Try again</button></div></main>;
}
