import { connectDB } from "@/db/mongoose";
import { Order } from "@/db/models/Order";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getOrders() {
  try {
    await connectDB();
    return await Order.find().sort({ createdAt: -1 }).limit(100).lean();
  } catch {
    return [];
  }
}

export default async function AdminOrders() {
  const orders = await getOrders();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">{orders.length} recent</p>
      <div className="mt-8 overflow-hidden rounded-xl border">
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
            {orders.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No orders yet.</td></tr>
            ) : orders.map((o) => (
              <tr key={String(o._id)}>
                <td className="px-4 py-3 font-mono text-xs">#{String(o._id).slice(-8)}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{o.customerName || "—"}</div>
                  <div className="text-xs text-muted-foreground">{o.customerEmail}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {o.items.reduce((s, i) => s + i.quantity, 0)}
                </td>
                <td className="px-4 py-3">{formatPrice(o.totalInCents)}</td>
                <td className="px-4 py-3">
                  <Badge variant={o.status === "paid" ? "default" : "outline"}>{o.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(o.createdAt as unknown as string).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
