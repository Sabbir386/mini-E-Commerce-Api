import { Schema, model, Document, Query } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 }, // <-- prevents negative stock
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Filter out deleted products automatically
productSchema.pre(/^find/, function (this: Query<any, Document>, next) {
  this.find({ isDeleted: false });
  next();
});

export const Product = model<IProduct>("Product", productSchema);
