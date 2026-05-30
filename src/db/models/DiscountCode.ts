import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const DiscountCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    discountAmount: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true, index: true },
    expiresAt: { type: Date },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type DiscountCodeDoc = InferSchemaType<typeof DiscountCodeSchema> & { _id: mongoose.Types.ObjectId };

export const DiscountCode: Model<DiscountCodeDoc> =
  (mongoose.models.DiscountCode as Model<DiscountCodeDoc>) ||
  mongoose.model<DiscountCodeDoc>("DiscountCode", DiscountCodeSchema);
