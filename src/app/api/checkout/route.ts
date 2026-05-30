import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-products";

const BodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Checkout is not configured. Set STRIPE_SECRET_KEY in .env to enable purchases.",
      },
      { status: 503 }
    );
  }
  try {
    const json = await req.json();
    const { items } = BodySchema.parse(json);

    // Resolve each item against the hardcoded catalogue so the client
    // can't tamper with prices or names.
    const resolved = items.map((i) => {
      const product = PLACEHOLDER_PRODUCTS.find(
        (p) => p._id === i.productId || p.slug === i.productId
      );
      return product ? { product, quantity: i.quantity } : null;
    });

    if (resolved.some((r) => r === null)) {
      return NextResponse.json(
        { error: "One or more products are not in the catalogue" },
        { status: 400 }
      );
    }

    const line_items = resolved.map((r) => ({
      quantity: r!.quantity,
      price_data: {
        currency: "usd",
        unit_amount: r!.product.priceInCents,
        product_data: {
          name: r!.product.name,
          images: r!.product.imageUrl ? [r!.product.imageUrl] : undefined,
          metadata: { productId: r!.product._id, slug: r!.product.slug },
        },
      },
    }));

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "DE", "FR", "ES", "IT", "AU"],
      },
      automatic_tax: { enabled: false },
      customer_creation: "always",
      metadata: { source: "sensei-shop" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request", issues: err.issues }, { status: 400 });
    }
    console.error("[checkout] error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
