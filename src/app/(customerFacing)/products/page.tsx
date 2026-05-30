import Link from "next/link";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { ProductCard } from "../_components/product-card";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-products";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export const metadata = { title: "Shop — Sensei" };

const CATEGORIES = [
  { slug: undefined, label: "All" },
  { slug: "rings", label: "Rings" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "earrings", label: "Earrings" },
  { slug: "bracelets", label: "Bracelets" },
];

async function getAll(category?: string) {
  try {
    await connectDB();
    const query: Record<string, unknown> = { isAvailable: true };
    if (category) query.category = category;
    const result = await Product.find(query).sort({ createdAt: -1 }).lean();
    return result.map((p) => ({
      _id: String(p._id),
      slug: p.slug,
      name: p.name,
      priceInCents: p.priceInCents,
      imageUrl: p.imageUrl,
      category: p.category,
    }));
  } catch {
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const fromDb = await getAll(category);
  const products =
    fromDb.length > 0
      ? fromDb
      : PLACEHOLDER_PRODUCTS.filter((p) => !category || p.category === category);
  const isPlaceholder = fromDb.length === 0;

  return (
    <div className="container-narrow py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          The collection
        </p>
        <h1 className="mt-2 text-3xl font-semibold md:text-5xl">
          {category ? CATEGORIES.find((c) => c.slug === category)?.label ?? "Shop" : "All pieces"}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Eight pieces, four categories. Each one cast and finished by hand in our Lisbon studio,
          using recycled gold, silver and traceable stones.
        </p>
      </header>

      <nav className="mb-10 flex flex-wrap gap-2 border-y py-4">
        {CATEGORIES.map((c) => {
          const active = (c.slug ?? "") === (category ?? "");
          return (
            <Link
              key={c.label}
              href={c.slug ? `/products?category=${c.slug}` : "/products"}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      {products.length === 0 ? (
        <div className="rounded-xl border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nothing here yet in this category.
          </p>
        </div>
      ) : (
        <>
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
          {isPlaceholder && (
            <p className="mt-12 text-center text-xs text-muted-foreground">
              Showing placeholder pieces. Run <code className="rounded bg-muted px-1.5 py-0.5">npm run seed</code> once MongoDB is connected to load the full catalogue.
            </p>
          )}
        </>
      )}
    </div>
  );
}
