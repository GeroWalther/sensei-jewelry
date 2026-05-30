import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

type Props = {
  slug: string;
  name: string;
  priceInCents: number;
  imageUrl: string;
  category?: string;
};

export function ProductCard({ slug, name, priceInCents, imageUrl, category }: Props) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium leading-tight">{name}</h3>
          {category && <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">{category}</p>}
        </div>
        <p className="shrink-0 text-sm font-medium">{formatPrice(priceInCents)}</p>
      </div>
    </Link>
  );
}
