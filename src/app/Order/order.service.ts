import mongoose from "mongoose";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { Cart } from "../Cart/cart.model";
import { Product } from "../Product/product.model";
import { Order } from "./order.model";
import { User } from "../User/user.model";

const createOrder = async (
  userId: string,
  paymentMethod: "cash_on_delivery" | "online"
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, "Cart is empty");
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product: any = item.product;

      if (item.quantity > product.stock) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `${product.name} stock insufficient`
        );
      }

      // Deduct stock
      product.stock -= item.quantity;
      await product.save({ session });

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          totalAmount,
          paymentMethod,
          paymentStatus:
            paymentMethod === "cash_on_delivery" ? "unpaid" : "paid",
          status:
            paymentMethod === "cash_on_delivery" ? "pending" : "paid",
        },
      ],
      { session }
    );

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const getMyOrders = async (userId: string) => {
  return await Order.find({ user: userId }).populate("items.product");
};

const getAllOrders = async () => {
  return await Order.find().populate("items.product user");
};

const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError(httpStatus.NOT_FOUND, "Order not found");

  order.status = status as any;
  await order.save();

  return order;
};

const cancelOrder = async (userId: string, orderId: string) => {
  const order = await Order.findById(orderId);

  if (!order) throw new AppError(httpStatus.NOT_FOUND, "Order not found");

  if (order.user.toString() !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "Unauthorized");
  }

  if (["shipped", "delivered"].includes(order.status)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cannot cancel shipped/delivered order"
    );
  }

  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  if (user.cancellationCount >= 3) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cancellation limit exceeded"
    );
  }

  // Restore stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }

  order.status = "cancelled";
  order.isCancelled = true;
  await order.save();

  user.cancellationCount += 1;
  await user.save();

  return order;
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
