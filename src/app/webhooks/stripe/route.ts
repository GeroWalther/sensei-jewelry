import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { render } from "@react-email/components";
import { getStripe } from "@/lib/stripe";
import { resend, FROM_EMAIL } from "@/lib/resend";
import OrderReceiptEmail from "@/email/order-receipt";

export const runtime = "nodejs";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET missing");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const sig = (await headers()).get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[stripe-webhook] signature verification failed:", msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await handleCheckoutComplete(session);
    } catch (err) {
      console.error("[stripe-webhook] handler error:", err);
      return NextResponse.json({ error: "Handler failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  const items = lineItems.data.map((li) => {
    const product = li.price?.product as Stripe.Product | undefined;
    const productId = product?.metadata?.productId || String(product?.id || "");
    return {
      productId,
      name: li.description || product?.name || "Item",
      priceInCents: li.price?.unit_amount ?? 0,
      quantity: li.quantity ?? 1,
      imageUrl: product?.images?.[0],
    };
  });

  const totalInCents =
    session.amount_total ?? items.reduce((s, i) => s + i.priceInCents * i.quantity, 0);

  const customerEmail = session.customer_details?.email || "";
  const customerName = session.customer_details?.name || "";

  // Persist to Mongo if available (dormant in hardcoded mode).
  let orderId = session.id;
  if (process.env.MONGODB_URI) {
    try {
      const { connectDB } = await import("@/db/mongoose");
      const { Order } = await import("@/db/models/Order");
      const { Customer } = await import("@/db/models/Customer");
      await connectDB();

      const subtotalInCents = items.reduce((s, i) => s + i.priceInCents * i.quantity, 0);
      const order = await Order.findOneAndUpdate(
        { stripeCheckoutSessionId: session.id },
        {
          $setOnInsert: {
            customerEmail,
            customerName,
            items,
            subtotalInCents,
            totalInCents,
            status: "paid",
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id,
            shippingAddress: session.collected_information?.shipping_details?.address
              ? {
                  line1: session.collected_information.shipping_details.address.line1 ?? undefined,
                  line2: session.collected_information.shipping_details.address.line2 ?? undefined,
                  city: session.collected_information.shipping_details.address.city ?? undefined,
                  state: session.collected_information.shipping_details.address.state ?? undefined,
                  postalCode:
                    session.collected_information.shipping_details.address.postal_code ?? undefined,
                  country: session.collected_information.shipping_details.address.country ?? undefined,
                }
              : undefined,
          },
        },
        { upsert: true, new: true }
      );
      orderId = String(order._id);

      if (customerEmail) {
        await Customer.findOneAndUpdate(
          { email: customerEmail.toLowerCase() },
          { $setOnInsert: { email: customerEmail.toLowerCase(), name: customerName || undefined } },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.warn("[stripe-webhook] Mongo persistence skipped:", err);
    }
  }

  if (resend && customerEmail) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    const html = await render(
      OrderReceiptEmail({
        customerName: customerName || undefined,
        orderId,
        items,
        totalInCents,
        siteUrl,
      })
    );
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: `Your order is confirmed — #${orderId.slice(-8)}`,
        html,
      });
    } catch (err) {
      console.error("[stripe-webhook] resend send failed:", err);
    }
  }
}
