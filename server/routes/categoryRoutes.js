// server/routes/categoryRoutes.js
import express from "express";
import {
  getAllCategories,
  createCategory,
  getProductsByCategory,
} from "../app/controllers/categoryController.js";
import verifyToken from "../app/middlewares/verifyToken.js";

const router = express.Router();

// Route to get all categories (public)
router.get("/", getAllCategories);

// get products by category
router.get("/:id", getProductsByCategory);

// Admin route to add a new category
router.post("/", verifyToken, createCategory);

export default router;
