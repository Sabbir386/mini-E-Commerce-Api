
import express from "express";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../middleware/validateRequest";
import { auth } from "../middleware/auth";

const router = express.Router();

// Admin CRUD routes
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.createProductValidation),
  ProductController.createProduct
);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidation),
  ProductController.updateProduct
);

router.delete("/:id", auth(USER_ROLE.admin), ProductController.deleteProduct);

// Public routes
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRoutes = router;
