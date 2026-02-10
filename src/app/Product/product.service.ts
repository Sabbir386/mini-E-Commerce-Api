import AppError from "../errors/AppError";
import { Product } from "./product.model";
import httpStatus from "http-status";

const createProduct = async (payload: any) => {
  const product = await Product.create(payload);
  return product;
};

const updateProduct = async (id: string, payload: any) => {
  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  return product;
};

const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  return product;
};

const getAllProducts = async () => {
  return await Product.find();
};

const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  return product;
};

export const ProductService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
