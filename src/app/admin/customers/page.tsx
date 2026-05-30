import { connectDB } from "@/db/mongoose";
import { Customer } from "@/db/models/Customer";
import { DEMO_CUSTOMERS, DemoBanner } from "@/lib/placeholder-admin";

export const dynamic = "force-dynamic";

type CustomerRow = { _id: string; email: string; name?: string; createdAt: string };

async function getCustomers(): Promise<{ rows: CustomerRow[]; isDemo: boolean }> {
  try {
    await connectDB();
    const list = await Customer.find().sort({ createdAt: -1 }).limit(200).lean();
    if (list.length === 0) return { rows: DEMO_CUSTOMERS, isDemo: true };
    return {
      rows: list.map((c) => ({
        _id: String(c._id),
        email: c.email,
        name: c.name ?? undefined,
        createdAt:
          c.createdAt instanceof Date ? c.createdAt.toISOString() : String(c.createdAt),
      })),
      isDemo: false,
    };
  } catch {
    return { rows: DEMO_CUSTOMERS, isDemo: true };
  }
}

export default async function AdminCustomers() {
  const { rows, isDemo } = await getCustomers();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Customers</h1>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} total</p>

      <div className="mt-6">
        {isDemo && <DemoBanner />}
      </div>

      <div className="mt-2 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((c) => (
              <tr key={c._id}>
                <td className="px-4 py-3 font-medium">{c.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.name || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
