// server/routes/categoryRoutes.js
import express from "express";
import {
  getAllCategories,
  createCategory,
  getProductsByCategory,
  updateCategory,
  deleteCategory,
} from "../app/controllers/categoryController.js";
import verifyToken from "../app/middlewares/verifyToken.js";

const router = express.Router();

// Route to get all categories (public)
router.get("/", getAllCategories);

// get products by category
router.get("/:id", getProductsByCategory);

router.get("/categoryDetails/:id", getProductsByCategory);

// Admin route to add a new category
// router.post("/", verifyToken, createCategory);
router.post("/", createCategory);

router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
