import "dotenv/config";
import { connectDB } from "../src/db/mongoose";
import { Product } from "../src/db/models/Product";

const products = [
  {
    name: "Linen Throw",
    slug: "linen-throw",
    description:
      "A soft, garment-washed linen throw. Lightweight in summer, layered in winter.\nMeasures 130 × 180 cm.",
    priceInCents: 6900,
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
    category: "home",
  },
  {
    name: "Ceramic Mug",
    slug: "ceramic-mug",
    description:
      "Hand-thrown stoneware mug with a matte glaze. Holds 300 ml.\nDishwasher safe.",
    priceInCents: 2400,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    category: "home",
  },
  {
    name: "Canvas Tote",
    slug: "canvas-tote",
    description: "Heavyweight 16 oz cotton canvas tote with reinforced straps. Big enough for a week of groceries.",
    priceInCents: 3200,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    category: "accessories",
  },
  {
    name: "Brass Desk Lamp",
    slug: "brass-desk-lamp",
    description:
      "A simple swing-arm task lamp in brushed brass. Warm 3000K LED, dimmable.",
    priceInCents: 14900,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    category: "lighting",
  },
  {
    name: "Wool Blanket",
    slug: "wool-blanket",
    description:
      "Loomed in Portugal from a 100% recycled wool blend. Generous queen-size proportions.",
    priceInCents: 12500,
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80",
    category: "home",
  },
  {
    name: "Leather Notebook",
    slug: "leather-notebook",
    description:
      "A5 vegetable-tanned leather notebook with 192 pages of 100gsm cream paper.",
    priceInCents: 4800,
    imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80",
    category: "stationery",
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
