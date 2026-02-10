import { Cart } from "./cart.model";

import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../errors/AppError";
import { Product } from "../Product/product.model";

const addItemToCart = async (userId: string, productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");

  if (quantity > product.stock)
    throw new AppError(httpStatus.BAD_REQUEST, "Quantity exceeds stock");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let cart = await Cart.findOne({ user: userId }).session(session);
    if (!cart) {
      const newCartArr = await Cart.create([{ user: userId, items: [], totalPrice: 0 }], { session });
      cart = newCartArr[0];
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity });
    }

    // recalc total
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.product).session(session);
      cart.totalPrice += (p?.price || 0) * item.quantity;
    }

    await cart.save({ session });
    await session.commitTransaction();
    session.endSession();
    return cart;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


const removeItemFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError(httpStatus.NOT_FOUND, "Cart not found");

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);

  // recalc total
  cart.totalPrice = 0;
  for (const item of cart.items) {
    const p = await Product.findById(item.product);
    cart.totalPrice += (p?.price || 0) * item.quantity;
  }

  await cart.save();
  return cart;
};

const getCartByUser = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  return cart;
};

export const CartService = {
  addItemToCart,
  removeItemFromCart,
  getCartByUser,
};
