import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { deleteProduct, toggleAvailability } from "../_actions/products";

export const dynamic = "force-dynamic";

async function getAll() {
  try {
    await connectDB();
    return await Product.find().sort({ createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export default async function AdminProducts() {
  const products = await getAll();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new"><Plus className="h-4 w-4" /> New product</Link>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No products yet.</td></tr>
            ) : products.map((p) => (
              <tr key={String(p._id)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
                      {p.imageUrl && <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="40px" />}
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3">{formatPrice(p.priceInCents)}</td>
                <td className="px-4 py-3">
                  <form action={toggleAvailability}>
                    <input type="hidden" name="id" value={String(p._id)} />
                    <button type="submit">
                      <Badge variant={p.isAvailable ? "default" : "outline"}>
                        {p.isAvailable ? "Active" : "Hidden"}
                      </Badge>
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteProduct} className="inline">
                    <input type="hidden" name="id" value={String(p._id)} />
                    <Button type="submit" variant="ghost" size="icon" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
