import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, required: true },
    priceInCents: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    category: { type: String, default: "general", index: true },
    isAvailable: { type: Boolean, default: true, index: true },
    stripeProductId: { type: String },
    stripePriceId: { type: String },
  },
  { timestamps: true }
);

export type ProductDoc = InferSchemaType<typeof ProductSchema> & { _id: mongoose.Types.ObjectId };

export const Product: Model<ProductDoc> =
  (mongoose.models.Product as Model<ProductDoc>) ||
  mongoose.model<ProductDoc>("Product", ProductSchema);
