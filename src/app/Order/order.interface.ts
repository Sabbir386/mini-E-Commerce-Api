import { Types } from "mongoose";

export type TOrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export type TPaymentStatus = "unpaid" | "paid";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;

  status: TOrderStatus;
  paymentStatus: TPaymentStatus;
  paymentMethod: "cash_on_delivery" | "online";

  isCancelled: boolean;
}
