import Link from "next/link";
import { ReactNode } from "react";
import { Package, ShoppingBag, Users, LayoutDashboard } from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r bg-muted/30 md:block">
        <div className="px-6 py-6">
          <Link href="/" className="text-base font-semibold">
            sensei<span className="text-muted-foreground">.</span>
            <span className="ml-1 text-xs font-normal text-muted-foreground">admin</span>
          </Link>
        </div>
        <nav className="px-3">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-x-auto px-6 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
