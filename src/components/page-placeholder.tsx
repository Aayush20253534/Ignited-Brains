import Link from "next/link";
import { navigation } from "@/lib/navigation";

type Props = { title: string; description: string; currentPath: string };

export function PagePlaceholder({ title, description, currentPath }: Props) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-200 py-6">
        <Link href="/" className="text-xl font-bold">Ignited Brains</Link>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-6 text-sm">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.href === currentPath ? "page" : undefined} className={item.href === currentPath ? "font-bold text-orange-700" : "hover:underline"}>{item.label}</Link>
          ))}
        </nav>
      </header>
      <main id="main-content" className="flex flex-1 flex-col justify-center py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-700">Ignited Brains</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{description}</p>
      </main>
      <footer className="border-t border-slate-200 py-6 text-sm text-slate-600">Curiosity. Creativity. Innovation.</footer>
    </div>
  );
}
