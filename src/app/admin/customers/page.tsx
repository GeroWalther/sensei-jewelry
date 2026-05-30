import { connectDB } from "@/db/mongoose";
import { Customer } from "@/db/models/Customer";

export const dynamic = "force-dynamic";

async function getCustomers() {
  try {
    await connectDB();
    return await Customer.find().sort({ createdAt: -1 }).limit(200).lean();
  } catch {
    return [];
  }
}

export default async function AdminCustomers() {
  const customers = await getCustomers();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Customers</h1>
      <p className="mt-1 text-sm text-muted-foreground">{customers.length} total</p>
      <div className="mt-8 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {customers.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">No customers yet.</td></tr>
            ) : customers.map((c) => (
              <tr key={String(c._id)}>
                <td className="px-4 py-3 font-medium">{c.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.name || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(c.createdAt as unknown as string).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
