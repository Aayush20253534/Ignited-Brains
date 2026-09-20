"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[62vh] place-items-center bg-white px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-orange">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">
          This page hit a temporary problem.
        </h1>
        <p className="mt-4 text-base leading-7 text-brand-muted">
          Retry the page and continue from where you were.
        </p>
        <Button onClick={reset} showArrow className="mt-7">Try Again</Button>
      </div>
    </main>
  );
}
