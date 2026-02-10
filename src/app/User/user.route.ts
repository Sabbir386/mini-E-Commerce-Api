import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../middleware/auth";


const router = express.Router();

// Admin only
router.get("/", auth("admin"), UserController.getAllUsers);

router.get("/:id", auth("admin"), UserController.getSingleUser);

router.delete("/:id", auth("admin"), UserController.deleteUser);

export const UserRoutes = router;
