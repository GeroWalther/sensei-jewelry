import { connectDB } from "@/db/mongoose";
import { Order } from "@/db/models/Order";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { DEMO_ORDERS, DemoBanner } from "@/lib/placeholder-admin";

export const dynamic = "force-dynamic";

type OrderRow = {
  _id: string;
  customerName?: string;
  customerEmail: string;
  itemsCount: number;
  totalInCents: number;
  status: string;
  createdAt: string;
};

async function getOrders(): Promise<{ rows: OrderRow[]; isDemo: boolean }> {
  try {
    await connectDB();
    const list = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
    if (list.length === 0) return { rows: DEMO_ORDERS, isDemo: true };
    return {
      rows: list.map((o) => ({
        _id: String(o._id),
        customerName: o.customerName ?? undefined,
        customerEmail: o.customerEmail,
        itemsCount: o.items.reduce((s, i) => s + i.quantity, 0),
        totalInCents: o.totalInCents,
        status: o.status,
        createdAt:
          o.createdAt instanceof Date ? o.createdAt.toISOString() : String(o.createdAt),
      })),
      isDemo: false,
    };
  } catch {
    return { rows: DEMO_ORDERS, isDemo: true };
  }
}

export default async function AdminOrders() {
  const { rows, isDemo } = await getOrders();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} recent</p>

      <div className="mt-6">
        {isDemo && <DemoBanner />}
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
                  <div className="font-medium">{o.customerName || "—"}</div>
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
