import catchAsync from "../utilis/catchAsync";
import sendResponse from "../utilis/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const { paymentMethod } = req.body;

  const result = await OrderService.createOrder(
    req.user.id,
    paymentMethod
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getMyOrders(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All orders retrieved",
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const result = await OrderService.updateOrderStatus(
    orderId,
    status
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order status updated",
    data: result,
  });
});

const cancelOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await OrderService.cancelOrder(
    req.user.id,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order cancelled",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  cancelOrder,
};
