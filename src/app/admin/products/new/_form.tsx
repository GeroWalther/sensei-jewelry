"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProduct } from "../../_actions/products";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create product"}
    </Button>
  );
}

export function NewProductForm() {
  const [state, action] = useFormState(createProduct, { error: undefined } as { error?: string });
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required placeholder="Linen Throw" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required placeholder="linen-throw" pattern="[a-z0-9-]+" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={4} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="priceInCents">Price (in cents)</Label>
          <Input id="priceInCents" name="priceInCents" type="number" required min={1} placeholder="4900" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" defaultValue="general" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" type="url" required placeholder="https://..." />
      </div>
      <div className="flex items-center gap-2">
        <input id="isAvailable" name="isAvailable" type="checkbox" defaultChecked className="h-4 w-4 rounded border" />
        <Label htmlFor="isAvailable">Available for purchase</Label>
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Submit />
    </form>
  );
}
