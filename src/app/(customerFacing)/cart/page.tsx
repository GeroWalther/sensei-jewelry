"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotalInCents());
  const [loading, setLoading] = useState(false);

  if (!hasHydrated) {
    return (
      <div className="container-narrow py-20 text-center">
        <LoaderCircle className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        toast.error(data.error || "Could not start checkout");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error("Network error");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Find something you&apos;ll love.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-narrow py-12 md:py-16">
      <h1 className="text-3xl font-semibold md:text-4xl">Cart</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <ul className="divide-y border-y">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-4 py-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted">
                {item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="96px" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-sm font-medium">{formatPrice(item.priceInCents * item.quantity)}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="inline-flex items-center rounded-md border">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2.5 py-1.5 transition-colors hover:bg-muted"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2.5 py-1.5 transition-colors hover:bg-muted"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border bg-muted/30 p-6">
          <h2 className="text-base font-medium">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-muted-foreground">Calculated at checkout</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Button size="lg" className="mt-6 w-full" onClick={handleCheckout} disabled={loading}>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Checkout"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Secure checkout powered by Stripe
          </p>
        </aside>
      </div>
    </div>
  );
}
