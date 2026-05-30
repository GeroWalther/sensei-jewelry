import "dotenv/config";
import { connectDB } from "../src/db/mongoose";
import { Product } from "../src/db/models/Product";

const products = [
  {
    name: "Aria Hoop — Gold",
    slug: "aria-hoop-gold",
    description:
      "Slim, lightweight hoops with a soft satin finish. The everyday earring you forget you're wearing.\n\nMaterial: 14k gold-filled\nDiameter: 18 mm\nWeight: 1.4 g per pair\n\nDesigned in Berlin, made by hand in our Lisbon studio.",
    priceInCents: 12800,
    imageUrl:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80",
    category: "earrings",
  },
  {
    name: "Mira Pendant Necklace",
    slug: "mira-pendant-necklace",
    description:
      "A small freshwater pearl drop on a fine chain. Sits just below the collarbone.\n\nMaterial: Recycled sterling silver, freshwater pearl\nChain length: 42 cm + 3 cm extender\nPearl: 6 mm, AAA grade\n\nEach pearl is unique — yours will vary slightly in shape and luster.",
    priceInCents: 16500,
    imageUrl:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
    category: "necklaces",
  },
  {
    name: "Solene Signet Ring",
    slug: "solene-signet-ring",
    description:
      "A modern take on a classic. Smooth, sculptural face — engraving available on request.\n\nMaterial: Solid 9k recycled gold\nFace: 12 × 10 mm oval\nBand width: 2.4 mm\n\nMade to order in your size; please allow 2–3 weeks.",
    priceInCents: 38900,
    imageUrl:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    category: "rings",
  },
  {
    name: "Linea Tennis Bracelet",
    slug: "linea-tennis-bracelet",
    description:
      "A single line of lab-grown diamonds, set in a clean four-prong setting. Stacks beautifully or wears alone.\n\nMaterial: 14k recycled white gold, lab-grown diamonds\nTotal carat weight: 1.5 ct\nLength: 17 cm with secure box clasp",
    priceInCents: 89000,
    imageUrl:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    category: "bracelets",
  },
  {
    name: "Nori Stud Earrings",
    slug: "nori-stud-earrings",
    description:
      "A pair of cool, architectural studs. Tiny enough for everyday, distinct enough to notice.\n\nMaterial: Recycled sterling silver\nDimensions: 5 × 5 mm\nClosure: Friction-back posts",
    priceInCents: 6900,
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    category: "earrings",
  },
  {
    name: "Halo Chain Necklace",
    slug: "halo-chain-necklace",
    description:
      "A simple paperclip-link chain that layers with everything. Worn alone, it disappears into your wardrobe.\n\nMaterial: 14k gold vermeil over recycled sterling silver\nLength: 45 cm\nLink: 5 × 3 mm",
    priceInCents: 14200,
    imageUrl:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
    category: "necklaces",
  },
  {
    name: "Ondine Stacking Ring",
    slug: "ondine-stacking-ring",
    description:
      "A thin, faceted band designed to wear alone or stack three deep. Soft hammered surface catches the light.\n\nMaterial: Solid 14k recycled gold\nBand width: 1.6 mm\n\nMade to order; 2–3 weeks.",
    priceInCents: 22500,
    imageUrl:
      "https://images.unsplash.com/photo-1603561596112-db542de3e1c8?auto=format&fit=crop&w=900&q=80",
    category: "rings",
  },
  {
    name: "Vela Cuff Bracelet",
    slug: "vela-cuff-bracelet",
    description:
      "A sculptural open cuff inspired by the curve of a sail. Smooth, weighty, quietly modern.\n\nMaterial: Recycled sterling silver\nWidth: 6 mm tapered\nFits wrist sizes 15–18 cm",
    priceInCents: 18900,
    imageUrl:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
    category: "bracelets",
  },
];

async function run() {
  await connectDB();
  console.log("Connected. Seeding products...");
  for (const p of products) {
    await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    console.log(`  ✓ ${p.name}`);
  }
  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
