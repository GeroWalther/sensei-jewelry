import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-products";
import { DemoBanner } from "@/lib/placeholder-admin";

export default function AdminProducts() {
  const rows = PLACEHOLDER_PRODUCTS;
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Catalogue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length} pieces · edit in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            src/lib/placeholder-products.ts
          </code>
          .
        </p>
      </div>

      <div className="mt-6">
        <DemoBanner />
      </div>

      <div className="mt-2 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
                      {p.imageUrl && (
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="40px" />
                      )}
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
                  <Badge>Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
