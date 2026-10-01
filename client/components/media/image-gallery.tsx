"use client";

import { useId, useState } from "react";
import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function ImageGallery({ items }: { items: { image: string; label: string }[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();
  const current = selected === null ? null : items[selected];
  return <>
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => <button key={item.image} type="button" onClick={() => setSelected(index)}
        aria-label={`Enlarge: ${item.label}`} className="focus-ring overflow-hidden rounded-2xl border border-brand-line bg-white text-left shadow-card transition hover:shadow-card-hover">
        <SiteImage src={item.image} alt="" aspectRatio="16/10" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        <span className="block px-4 py-3 text-sm font-semibold text-brand-blue">{item.label}</span>
      </button>)}
    </div>
    <Modal open={current !== null} onClose={() => setSelected(null)} labelledBy={id} className="w-[64rem]">
      {current ? <div className="modal-panel rounded-2xl bg-white p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id={id} className="text-xl font-bold text-brand-blue">{current.label}</h2>
          <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
        </div>
        <SiteImage src={current.image} alt={current.label} aspectRatio="16/10" sizes="90vw" fit="contain" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <Button variant="outline" onClick={() => setSelected((selected! + items.length - 1) % items.length)}>Previous</Button>
          <p className="text-sm text-brand-muted" aria-live="polite">{selected! + 1} / {items.length}</p>
          <Button variant="outline" onClick={() => setSelected((selected! + 1) % items.length)}>Next</Button>
        </div>
      </div> : null}
    </Modal>
  </>;
}
