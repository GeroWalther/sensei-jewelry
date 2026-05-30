"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from "@/lib/cart-store";

type Props = { product: Omit<CartItem, "quantity"> };

export function AddToCartButton({ product }: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="inline-flex items-center rounded-md border">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 transition-colors hover:bg-muted"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-8 text-center text-sm font-medium">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 transition-colors hover:bg-muted"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button
        size="lg"
        className="flex-1"
        onClick={() => {
          addItem(product, qty);
          toast.success(`Added ${qty} × ${product.name} to cart`);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
