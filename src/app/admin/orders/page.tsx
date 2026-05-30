import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { DEMO_ORDERS, DemoBanner } from "@/lib/placeholder-admin";

export default function AdminOrders() {
  const rows = DEMO_ORDERS;
  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} recent</p>

      <div className="mt-6">
        <DemoBanner />
      </div>

      <div className="mt-2 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((o) => (
              <tr key={o._id}>
                <td className="px-4 py-3 font-mono text-xs">#{o._id.slice(-8)}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{o.customerName}</div>
                  <div className="text-xs text-muted-foreground">{o.customerEmail}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{o.itemsCount}</td>
                <td className="px-4 py-3">{formatPrice(o.totalInCents)}</td>
                <td className="px-4 py-3">
                  <Badge variant={o.status === "paid" ? "default" : "outline"}>{o.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
