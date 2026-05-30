import Link from "next/link";
import { Check } from "lucide-react";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { ClearCartOnMount } from "./_clear-cart";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let customerEmail: string | null = null;
  if (sessionId && isStripeConfigured()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      customerEmail = session.customer_details?.email ?? null;
    } catch {
      customerEmail = null;
    }
  }

  return (
    <div className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <ClearCartOnMount />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
        <Check className="h-7 w-7" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold md:text-4xl">Order confirmed</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Thanks for your order. {customerEmail ? `We sent a receipt to ${customerEmail}.` : "We sent a receipt to your email."}
      </p>
      <Button asChild className="mt-8">
        <Link href="/products">Continue shopping</Link>
      </Button>
    </div>
  );
}
