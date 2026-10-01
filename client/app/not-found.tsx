import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[55vh] place-items-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-orange)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[var(--brand-blue)]">
          This page does not exist.
        </h1>
        <p className="mt-4 text-[var(--brand-muted)]">
          Check the address or return to the home page to continue exploring.
        </p>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-orange)] px-6 font-semibold text-white transition hover:bg-[var(--brand-orange-dark)]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
