import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    priceInCents: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    imageUrl: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    customerEmail: { type: String, required: true, lowercase: true, index: true },
    customerName: { type: String },
    items: { type: [OrderItemSchema], required: true },
    subtotalInCents: { type: Number, required: true },
    totalInCents: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "cancelled"],
      default: "pending",
      index: true,
    },
    stripeCheckoutSessionId: { type: String, unique: true, sparse: true, index: true },
    stripePaymentIntentId: { type: String },
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true }
);

export type OrderDoc = InferSchemaType<typeof OrderSchema> & { _id: mongoose.Types.ObjectId };

export const Order: Model<OrderDoc> =
  (mongoose.models.Order as Model<OrderDoc>) ||
  mongoose.model<OrderDoc>("Order", OrderSchema);
