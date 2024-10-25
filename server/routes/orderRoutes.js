import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
} from "../app/controllers/orderController.js";

const router = express.Router();

// Router making connection between route and controller
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);

export default router;
