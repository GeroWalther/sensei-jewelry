"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectDB } from "@/db/mongoose";
import { Product } from "@/db/models/Product";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, dashes"),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(1),
  isAvailable: z.coerce.boolean(),
});

export async function createProduct(_: unknown, formData: FormData) {
  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    priceInCents: formData.get("priceInCents"),
    imageUrl: formData.get("imageUrl"),
    category: formData.get("category") || "general",
    isAvailable: formData.get("isAvailable") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join(", ") };
  }
  await connectDB();
  const exists = await Product.findOne({ slug: parsed.data.slug });
  if (exists) return { error: "Slug already in use" };
  await Product.create(parsed.data);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function toggleAvailability(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await connectDB();
  const p = await Product.findById(id);
  if (!p) return;
  p.isAvailable = !p.isAvailable;
  await p.save();
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
