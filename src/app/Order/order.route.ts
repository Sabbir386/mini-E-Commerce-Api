import express from "express";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";
import validateRequest from "../middleware/validateRequest";
import { auth } from "../middleware/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

// Customer
router.post(
    "/",
    auth(USER_ROLE.customer),
    validateRequest(OrderValidation.createOrderValidation),
    OrderController.createOrder
);

router.get(
    "/my-orders",
    auth(USER_ROLE.customer),
    OrderController.getMyOrders
);

router.patch(
    "/cancel/:orderId",
    auth(USER_ROLE.customer),
    OrderController.cancelOrder
);

// Admin
router.get(
    "/",
    auth(USER_ROLE.admin),
    OrderController.getAllOrders
);

router.patch(
    "/status/:orderId",
    auth(USER_ROLE.admin),
    validateRequest(OrderValidation.updateStatusValidation),
    OrderController.updateStatus
);

export const OrderRoutes = router;
