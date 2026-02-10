
import catchAsync from "../utilis/catchAsync";
import sendResponse from "../utilis/sendResponse";
import { CartService } from "./cart.service";
import httpStatus from "http-status";

const addItem = catchAsync(async (req, res) => {
    const { productId, quantity } = req.body;
    const result = await CartService.addItemToCart(req.user.id, productId, quantity);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Item added to cart",
        data: result,
    });
});

const removeItem = catchAsync(async (req, res) => {
    const { productId } = req.body;
    const result = await CartService.removeItemFromCart(req.user.id, productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Item removed from cart",
        data: result,
    });
});

const getCart = catchAsync(async (req, res) => {
    const result = await CartService.getCartByUser(req.user.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cart retrieved successfully",
        data: result,
    });
});

export const CartController = {
    addItem,
    removeItem,
    getCart,
};
