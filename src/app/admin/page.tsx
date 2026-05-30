import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { DEMO_STATS, DemoBanner } from "@/lib/placeholder-admin";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Snapshot of your store.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-2xl">{formatPrice(DEMO_STATS.revenueInCents)}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">From paid orders</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid orders</CardDescription>
            <CardTitle className="text-2xl">{DEMO_STATS.orderCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">Lifetime</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products</CardDescription>
            <CardTitle className="text-2xl">{DEMO_STATS.productCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">In catalogue</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Customers</CardDescription>
            <CardTitle className="text-2xl">{DEMO_STATS.customerCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">Unique emails</CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <DemoBanner />
      </div>
    </div>
  );
}
