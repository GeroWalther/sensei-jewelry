import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";

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
  try {
    const json = await req.json();
    const { items } = BodySchema.parse(json);

    await connectDB();
    const products = await Product.find({
      _id: { $in: items.map((i) => i.productId) },
      isAvailable: true,
    }).lean();

    if (products.length !== items.length) {
      return NextResponse.json({ error: "One or more products are unavailable" }, { status: 400 });
    }

    const line_items = items.map((i) => {
      const product = products.find((p) => String(p._id) === i.productId)!;
      return {
        quantity: i.quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.priceInCents,
          product_data: {
            name: product.name,
            images: product.imageUrl ? [product.imageUrl] : undefined,
            metadata: { productId: String(product._id) },
          },
        },
      };
    });

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "DE", "FR", "ES", "IT", "AU"] },
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
