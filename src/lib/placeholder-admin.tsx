import { PLACEHOLDER_PRODUCTS } from "./placeholder-products";

export const DEMO_STATS = {
  revenueInCents: 1_284_700,
  orderCount: 47,
  productCount: PLACEHOLDER_PRODUCTS.length,
  customerCount: 23,
};

export const DEMO_ORDERS = [
  {
    _id: "demo-order-a3f9c2",
    customerName: "Hannah Werner",
    customerEmail: "hannah.werner@example.com",
    itemsCount: 2,
    totalInCents: 22500,
    status: "paid" as const,
    createdAt: "2026-05-28T14:22:00Z",
  },
  {
    _id: "demo-order-b81c44",
    customerName: "Lukas Müller",
    customerEmail: "lukas.muller@example.com",
    itemsCount: 1,
    totalInCents: 38900,
    status: "paid" as const,
    createdAt: "2026-05-27T09:15:00Z",
  },
  {
    _id: "demo-order-c92ea7",
    customerName: "Amélie Renaud",
    customerEmail: "amelie.r@example.com",
    itemsCount: 3,
    totalInCents: 41200,
    status: "shipped" as const,
    createdAt: "2026-05-26T17:48:00Z",
  },
  {
    _id: "demo-order-d4711f",
    customerName: "Naomi Tanaka",
    customerEmail: "n.tanaka@example.com",
    itemsCount: 1,
    totalInCents: 89000,
    status: "paid" as const,
    createdAt: "2026-05-25T11:03:00Z",
  },
  {
    _id: "demo-order-e6f2b0",
    customerName: "Marco Bianchi",
    customerEmail: "marco.b@example.com",
    itemsCount: 2,
    totalInCents: 19700,
    status: "pending" as const,
    createdAt: "2026-05-24T20:32:00Z",
  },
  {
    _id: "demo-order-f1d827",
    customerName: "Sofia García",
    customerEmail: "sofia.g@example.com",
    itemsCount: 1,
    totalInCents: 12800,
    status: "paid" as const,
    createdAt: "2026-05-23T08:54:00Z",
  },
  {
    _id: "demo-order-91a4c3",
    customerName: "Theo Lambert",
    customerEmail: "theo.l@example.com",
    itemsCount: 2,
    totalInCents: 31400,
    status: "paid" as const,
    createdAt: "2026-05-22T13:18:00Z",
  },
];

export const DEMO_CUSTOMERS = [
  { _id: "demo-cust-1", email: "hannah.werner@example.com", name: "Hannah Werner", createdAt: "2026-05-28T14:20:00Z" },
  { _id: "demo-cust-2", email: "lukas.muller@example.com", name: "Lukas Müller", createdAt: "2026-05-27T09:10:00Z" },
  { _id: "demo-cust-3", email: "amelie.r@example.com", name: "Amélie Renaud", createdAt: "2026-05-26T17:42:00Z" },
  { _id: "demo-cust-4", email: "n.tanaka@example.com", name: "Naomi Tanaka", createdAt: "2026-05-25T10:58:00Z" },
  { _id: "demo-cust-5", email: "marco.b@example.com", name: "Marco Bianchi", createdAt: "2026-05-24T20:28:00Z" },
  { _id: "demo-cust-6", email: "sofia.g@example.com", name: "Sofia García", createdAt: "2026-05-23T08:50:00Z" },
  { _id: "demo-cust-7", email: "theo.l@example.com", name: "Theo Lambert", createdAt: "2026-05-22T13:15:00Z" },
  { _id: "demo-cust-8", email: "isabel.f@example.com", name: "Isabel Fonseca", createdAt: "2026-05-21T16:02:00Z" },
];

export function DemoBanner() {
  return (
    <div className="mb-6 rounded-md border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
      <span className="font-medium text-foreground">Demo mode.</span>{" "}
      Showing example data — connect MongoDB and run{" "}
      <code className="rounded bg-background px-1.5 py-0.5 text-xs">npm run seed</code>{" "}
      to see live numbers.
    </div>
  );
}
