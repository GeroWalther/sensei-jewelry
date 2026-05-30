import { DEMO_CUSTOMERS, DemoBanner } from "@/lib/placeholder-admin";

export default function AdminCustomers() {
  const rows = DEMO_CUSTOMERS;
  return (
    <div>
      <h1 className="text-2xl font-semibold">Customers</h1>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} total</p>

      <div className="mt-6">
        <DemoBanner />
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
                <td className="px-4 py-3 text-muted-foreground">{c.name}</td>
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
