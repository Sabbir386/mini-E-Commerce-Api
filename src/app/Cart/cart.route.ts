import express from "express";
import { CartController } from "./cart.controller";
import { CartValidation } from "./cart.validation";
import { USER_ROLE } from "../User/user.constant";
import { auth } from "../middleware/auth";
import validateRequest from "../middleware/validateRequest";

const router = express.Router();

router.use(auth(USER_ROLE.customer)); // only customers can manage cart

router.post(
    "/add",
    validateRequest(CartValidation.addItemValidation),
    CartController.addItem
);

router.post(
    "/remove",
    validateRequest(CartValidation.removeItemValidation),
    CartController.removeItem
);

router.get("/", CartController.getCart);

export const CartRoutes = router;
