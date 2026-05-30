import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t bg-background">
      <div className="container-narrow grid gap-12 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            sensei<span className="text-muted-foreground">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Fine jewellery made slowly, in a small studio in Lisbon. Recycled metals, traceable
            stones, built to last decades.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <InstagramIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/products" className="hover:text-foreground">All pieces</Link></li>
            <li><Link href="/products?category=rings" className="hover:text-foreground">Rings</Link></li>
            <li><Link href="/products?category=necklaces" className="hover:text-foreground">Necklaces</Link></li>
            <li><Link href="/products?category=earrings" className="hover:text-foreground">Earrings</Link></li>
            <li><Link href="/products?category=bracelets" className="hover:text-foreground">Bracelets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Studio</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground">Our story</Link></li>
            <li><Link href="/journal" className="hover:text-foreground">Journal</Link></li>
            <li><Link href="/sustainability" className="hover:text-foreground">Sustainability</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/shipping" className="hover:text-foreground">Shipping & delivery</Link></li>
            <li><Link href="/returns" className="hover:text-foreground">Returns</Link></li>
            <li><Link href="/care" className="hover:text-foreground">Care & repair</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Sensei Studio · Made in Lisbon.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
