import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { ProductCard } from "../_components/product-card";

export const revalidate = 60;

export const metadata = { title: "Shop — Sensei" };

async function getAll() {
  try {
    await connectDB();
    return await Product.find({ isAvailable: true }).sort({ createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getAll();
  return (
    <div className="container-narrow py-12 md:py-16">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">All products</h1>
        <p className="mt-3 text-muted-foreground">Browse the full catalog.</p>
      </header>

      {products.length === 0 ? (
        <div className="rounded-xl border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No products yet. Run <code className="rounded bg-background px-1.5 py-0.5 text-xs">npm run seed</code> to add demo products,
            or sign in to <code className="rounded bg-background px-1.5 py-0.5 text-xs">/admin</code> to add your own.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={String(p._id)}
              slug={p.slug}
              name={p.name}
              priceInCents={p.priceInCents}
              imageUrl={p.imageUrl}
              category={p.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
