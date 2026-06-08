"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryImage = { url: string; alt: string };

export function CarGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = React.useState(0);
  const main = images[active] ?? images[0];
  if (!main) {
    return (
      <div className="aspect-[4/3] w-full rounded-2xl bg-neutral-100 grid place-items-center text-neutral-400">
        No image
      </div>
    );
  }
  return (
    <div>
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-100">
        <Image
          src={main.url}
          alt={main.alt}
          fill
          priority
          sizes="(min-width:1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 border-2 transition",
                active === i ? "border-brand-yellow" : "border-transparent hover:border-neutral-300"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
