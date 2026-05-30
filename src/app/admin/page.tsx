import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";
import { Order } from "@/db/models/Order";
import { Customer } from "@/db/models/Customer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { DEMO_STATS, DemoBanner } from "@/lib/placeholder-admin";

export const dynamic = "force-dynamic";

type Stats = {
  productCount: number;
  customerCount: number;
  orderCount: number;
  revenueInCents: number;
  isDemo: boolean;
};

async function getStats(): Promise<Stats> {
  try {
    await connectDB();
    const [productCount, customerCount, paidOrders] = await Promise.all([
      Product.countDocuments(),
      Customer.countDocuments(),
      Order.find({ status: "paid" }).select("totalInCents").lean(),
    ]);
    const revenueInCents = paidOrders.reduce((s, o) => s + o.totalInCents, 0);
    if (productCount === 0 && customerCount === 0 && paidOrders.length === 0) {
      return { ...DEMO_STATS, isDemo: true };
    }
    return {
      productCount,
      customerCount,
      orderCount: paidOrders.length,
      revenueInCents,
      isDemo: false,
    };
  } catch {
    return { ...DEMO_STATS, isDemo: true };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Snapshot of your store.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-2xl">{formatPrice(stats.revenueInCents)}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">From paid orders</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid orders</CardDescription>
            <CardTitle className="text-2xl">{stats.orderCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">Lifetime</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products</CardDescription>
            <CardTitle className="text-2xl">{stats.productCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">In catalogue</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Customers</CardDescription>
            <CardTitle className="text-2xl">{stats.customerCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">Unique emails</CardContent>
        </Card>
      </div>

      {stats.isDemo && (
        <div className="mt-8">
          <DemoBanner />
        </div>
      )}
    </div>
  );
}
