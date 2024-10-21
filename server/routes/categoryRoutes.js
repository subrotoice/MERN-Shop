// server/routes/categoryRoutes.js
import express from "express";
import {
  getAllCategories,
  createCategory,
} from "../app/controllers/categoryController.js";
import verifyToken from "../app/middlewares/verifyToken.js";

const router = express.Router();

// Route to get all categories (public)
router.get("/", getAllCategories);

// Admin route to add a new category
router.post("/", verifyToken, createCategory);

export default router;
