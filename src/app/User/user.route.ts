import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

// Admin only
router.get("/", auth(USER_ROLE.admin), UserController.getAllUsers);

router.get("/:id", auth(USER_ROLE.admin), UserController.getSingleUser);

router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
