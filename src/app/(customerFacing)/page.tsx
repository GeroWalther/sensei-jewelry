import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Hammer, Recycle } from "lucide-react";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { Button } from "@/components/ui/button";
import { HeroImageSwap } from "@/components/site/hero-image-swap";
import { ProductCard } from "./_components/product-card";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-products";

export const revalidate = 60;

const HERO_PRIMARY =
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=85";
const HERO_SECONDARY =
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=85";

const COLLECTIONS = [
  {
    name: "Rings",
    href: "/products?category=rings",
    image:
      "https://images.unsplash.com/photo-1603561596112-db542de3e1c8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Necklaces",
    href: "/products?category=necklaces",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Earrings",
    href: "/products?category=earrings",
    image:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bracelets",
    href: "/products?category=bracelets",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  },
];

const JOURNAL = [
  {
    tag: "Materials",
    title: "Why we only use recycled gold",
    excerpt:
      "Mining one gram of new gold can produce more than twenty tonnes of waste. Here's how we trace ours back to its source.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Craft",
    title: "A day in the Lisbon studio",
    excerpt:
      "From wax carving to the final polish — a quiet look at how a single ring takes shape over the course of a week.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Care",
    title: "How to wear (and keep) your fine jewellery",
    excerpt:
      "Six small habits — none of them complicated — that will keep your pieces looking like new for years to come.",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
  },
];

async function getFeatured() {
  try {
    await connectDB();
    const result = await Product.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
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

export default async function HomePage() {
  const fromDb = await getFeatured();
  const featured = fromDb.length > 0 ? fromDb : PLACEHOLDER_PRODUCTS.slice(0, 4);
  const isPlaceholder = fromDb.length === 0;

  return (
    <>
      {/* Hero */}
      <section className="container-narrow grid items-center gap-12 pb-16 pt-12 md:grid-cols-2 md:gap-16 md:pb-24 md:pt-20">
        <div className="space-y-6 animate-fade-in">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Sensei · Fine jewellery
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Quiet pieces,<br />made to be worn.
          </h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            Recycled gold and ethically sourced stones, shaped by hand in our Lisbon studio.
            Designed for every day, built to last several.
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
          <div className="flex items-center gap-6 pt-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Recycle className="h-3.5 w-3.5" /> 100% recycled gold</span>
            <span className="inline-flex items-center gap-1.5"><Hammer className="h-3.5 w-3.5" /> Hand-finished</span>
            <span className="inline-flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5" /> Carbon-neutral shipping</span>
          </div>
        </div>
        <HeroImageSwap
          primary={{ src: HERO_PRIMARY, alt: "Featured piece — front" }}
          secondary={{ src: HERO_SECONDARY, alt: "Featured piece — worn" }}
        />
      </section>

      {/* Collections grid */}
      <section className="container-narrow py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Shop by category</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Four collections, eight pieces.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {COLLECTIONS.map((c) => (
            <Link key={c.name} href={c.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-4 left-4 text-base font-medium text-white">
                  {c.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-narrow py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">New & noted</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Featured pieces</h2>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-medium underline-offset-4 hover:underline md:inline-flex"
          >
            View all
          </Link>
        </div>
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
        {isPlaceholder && (
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Showing placeholder products. Run <code className="rounded bg-muted px-1.5 py-0.5">npm run seed</code> after connecting MongoDB to load the full catalogue.
          </p>
        )}
      </section>

      {/* Editorial / story */}
      <section className="border-y bg-muted/30">
        <div className="container-narrow grid items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-background">
            <Image
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
              alt="Sensei studio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Made slowly, in a small studio by the river.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Sensei was founded in 2021 around a single idea: that the jewellery you wear every day
              should be made with the same care as the pieces you keep in a box.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Every piece is cast, finished and inspected by hand in our studio in Lisbon. We work in
              small batches, with metals traceable to their refiner and stones we&apos;ve seen in person.
              Nothing is rushed — and nothing is mass-produced.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline">
                <Link href="/about">Read the full story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Materials / ethos */}
      <section className="container-narrow py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Materials</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold md:text-4xl">
            What goes in matters as much as what comes out.
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We use only recycled precious metals, lab-grown and traceable stones, and packaging
            you can compost. Here&apos;s what that looks like in practice.
          </p>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Recycled gold & silver",
              body:
                "Every gram of metal in a Sensei piece has been worn before. Refining is done by Fairmined-certified partners in Italy and Spain.",
            },
            {
              title: "Lab-grown & traceable stones",
              body:
                "Lab-grown diamonds, sapphires and emeralds with verifiable origin reports. Identical in chemistry to mined stones; better for the world they live in.",
            },
            {
              title: "Built for life, not landfill",
              body:
                "Every piece comes with free lifetime cleaning, free re-plating after five years, and a straightforward repair policy.",
            },
          ].map((b) => (
            <div key={b.title}>
              <h3 className="text-base font-semibold">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="border-t">
        <div className="container-narrow py-20 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Journal</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Notes from the studio</h2>
            </div>
            <Link href="/journal" className="hidden text-sm font-medium underline-offset-4 hover:underline md:inline-flex">
              All entries
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {JOURNAL.map((j) => (
              <article key={j.title}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {j.tag}
                </p>
                <h3 className="mt-2 text-lg font-medium">{j.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t bg-muted/30">
        <div className="container-narrow py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                quote:
                  "I bought the Aria hoops six months ago and haven&apos;t taken them off — they&apos;ve been through the gym, the sea and the shower without losing a thing.",
                name: "Hannah W.",
                meta: "Aria Hoop — Gold",
              },
              {
                quote:
                  "Beautiful weight to it. The signet feels like something I&apos;ll be giving to someone, twenty years from now.",
                name: "Lukas M.",
                meta: "Solene Signet Ring",
              },
              {
                quote:
                  "Packaging, presentation, follow-up email — everything felt thoughtful. The piece itself is even better.",
                name: "Amélie R.",
                meta: "Mira Pendant Necklace",
              },
            ].map((t) => (
              <figure key={t.name}>
                <blockquote
                  className="text-base leading-relaxed text-foreground md:text-lg"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                />
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{t.name}</span> · {t.meta}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-narrow py-20 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">Stay in the loop</h2>
          <p className="mt-3 text-muted-foreground">
            Quiet emails, never more than once a month. New collections, journal entries and the
            occasional early-access drop.
          </p>
          <form
            className="mt-8 flex flex-col gap-2 sm:flex-row"
            action="#"
            method="post"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex h-11 flex-1 rounded-md border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" size="lg">Subscribe</Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            By subscribing you agree to our privacy policy. Unsubscribe any time.
          </p>
        </div>
      </section>

      {/* Promises */}
      <section className="border-t bg-muted/30">
        <div className="container-narrow grid gap-12 py-20 md:grid-cols-4">
          {[
            { title: "Free shipping", body: "Tracked and insured on orders over €150 worldwide." },
            { title: "Lifetime care", body: "Free cleaning and re-plating for as long as you own it." },
            { title: "60-day returns", body: "Try a piece at home. If it isn't right, send it back." },
            { title: "Made to order", body: "Most rings are made in your size; allow 2–3 weeks." },
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
