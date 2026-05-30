import Image from "next/image";
import { notFound } from "next/navigation";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "../../_components/add-to-cart-button";
import { findPlaceholder, type PlaceholderProduct } from "@/lib/placeholder-products";

export const revalidate = 60;

type ProductView = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  priceInCents: number;
  category: string;
  imageUrl: string;
  isPlaceholder: boolean;
};

async function loadProduct(slug: string): Promise<ProductView | null> {
  try {
    await connectDB();
    const p = await Product.findOne({ slug, isAvailable: true }).lean();
    if (p) {
      return {
        _id: String(p._id),
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceInCents: p.priceInCents,
        category: p.category,
        imageUrl: p.imageUrl,
        isPlaceholder: false,
      };
    }
  } catch {
    // Mongo unreachable — fall through to placeholder fallback below.
  }
  const ph: PlaceholderProduct | undefined = findPlaceholder(slug);
  if (ph) return { ...ph, isPlaceholder: true };
  return null;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await loadProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="container-narrow grid gap-12 py-12 md:grid-cols-2 md:gap-16 md:py-16">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-6">
        <div>
          <Badge variant="outline" className="uppercase tracking-wide">{product.category}</Badge>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-2xl font-medium">{formatPrice(product.priceInCents)}</p>
        </div>
        <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {product.isPlaceholder ? (
          <div className="rounded-md border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Demo product.</span>{" "}
            Connect MongoDB and run <code className="rounded bg-background px-1.5 py-0.5 text-xs">npm run seed</code> to make this purchasable.
          </div>
        ) : (
          <AddToCartButton
            product={{
              productId: product._id,
              slug: product.slug,
              name: product.name,
              priceInCents: product.priceInCents,
              imageUrl: product.imageUrl,
            }}
          />
        )}
        <div className="space-y-3 border-t pt-6 text-sm text-muted-foreground">
          <p><span className="font-medium text-foreground">Free shipping</span> on orders over €150.</p>
          <p><span className="font-medium text-foreground">Lifetime care</span> — free cleaning, free re-plating after five years.</p>
          <p><span className="font-medium text-foreground">60-day returns</span> on all unworn pieces.</p>
        </div>
      </div>
    </div>
  );
}
