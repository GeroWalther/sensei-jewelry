"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type HeroImageSwapProps = {
  primary: { src: string; alt: string };
  secondary: { src: string; alt: string };
  className?: string;
};

export function HeroImageSwap({ primary, secondary, className }: HeroImageSwapProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered((v) => !v)}
      className={cn(
        "group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted",
        className
      )}
    >
      <Image
        src={primary.src}
        alt={primary.alt}
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(
          "object-cover transition-all duration-700 ease-out",
          hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <Image
        src={secondary.src}
        alt={secondary.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(
          "object-cover transition-all duration-700 ease-out",
          hovered ? "scale-100 opacity-100" : "scale-110 opacity-0"
        )}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs font-medium text-white/90">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
          <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", hovered ? "bg-white" : "bg-white/50")} />
          {hovered ? "Alternate view" : "Hover to preview"}
        </span>
      </div>
    </div>
  );
}
