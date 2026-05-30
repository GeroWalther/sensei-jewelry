import Image from "next/image";
import { notFound } from "next/navigation";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "../../_components/add-to-cart-button";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug, isAvailable: true }).lean();
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
        <AddToCartButton
          product={{
            productId: String(product._id),
            slug: product.slug,
            name: product.name,
            priceInCents: product.priceInCents,
            imageUrl: product.imageUrl,
          }}
        />
        <div className="space-y-3 border-t pt-6 text-sm text-muted-foreground">
          <p><span className="font-medium text-foreground">Free shipping</span> on orders over $75.</p>
          <p><span className="font-medium text-foreground">30-day returns</span> on all unused items.</p>
        </div>
      </div>
    </div>
  );
}
