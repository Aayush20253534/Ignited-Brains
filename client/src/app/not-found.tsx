import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="mx-auto max-w-3xl px-6 py-24"><h1 className="text-4xl font-bold">Page not found</h1><p className="my-6">The page you are looking for is unavailable.</p><Link href="/" className="underline">Return home</Link></main>;
}
