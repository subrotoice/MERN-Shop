import express from "express";
import {
  createProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../app/controllers/product.controller.js";

const router = express.Router();

// Router making connection between route and controller
router.post("/", createProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
