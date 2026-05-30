import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t bg-background">
      <div className="container-narrow grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            sensei<span className="text-muted-foreground">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Carefully curated essentials. Made to last, designed for the everyday.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/products" className="hover:text-foreground">All products</Link></li>
            <li><Link href="/about" className="hover:text-foreground">Our story</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/shipping" className="hover:text-foreground">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-foreground">Returns</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Sensei Shop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
