import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { Button } from "@/components/ui/button";
import { HeroImageSwap } from "@/components/site/hero-image-swap";
import { ProductCard } from "./_components/product-card";

export const revalidate = 60;

const HERO_PRIMARY = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80";
const HERO_SECONDARY = "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80";

async function getFeatured() {
  try {
    await connectDB();
    return await Product.find({ isAvailable: true }).sort({ createdAt: -1 }).limit(4).lean();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeatured();

  return (
    <>
      <section className="container-narrow grid items-center gap-12 pb-16 pt-12 md:grid-cols-2 md:gap-16 md:pb-24 md:pt-20">
        <div className="space-y-6 animate-fade-in">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            New season · 2026
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Essentials,<br />refined for everyday life.
          </h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            A small collection of well-made objects. Honest materials, considered details,
            built to be used.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/products">Shop the collection</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/about">
                Our story <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <HeroImageSwap
          primary={{ src: HERO_PRIMARY, alt: "Featured product" }}
          secondary={{ src: HERO_SECONDARY, alt: "Alternate view" }}
        />
      </section>

      <section className="container-narrow py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Featured</h2>
            <p className="mt-1 text-sm text-muted-foreground">A look at what&apos;s new this week.</p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-medium underline-offset-4 hover:underline md:inline-flex"
          >
            View all
          </Link>
        </div>
        {featured.length === 0 ? (
          <div className="rounded-xl border bg-muted/30 p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No products yet. Run <code className="rounded bg-background px-1.5 py-0.5 text-xs">npm run seed</code> to add demo products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {featured.map((p) => (
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
      </section>

      <section className="border-t bg-muted/30">
        <div className="container-narrow grid gap-12 py-20 md:grid-cols-3">
          {[
            { title: "Free shipping", body: "On orders over $75. Always tracked." },
            { title: "30-day returns", body: "Try it at home. Send it back if it isn't right." },
            { title: "Made to last", body: "Materials chosen for longevity, not seasons." },
          ].map((b) => (
            <div key={b.title}>
              <h3 className="text-base font-medium">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
