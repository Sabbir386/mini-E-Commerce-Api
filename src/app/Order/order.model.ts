import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "online"],
      required: true,
    },

    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
