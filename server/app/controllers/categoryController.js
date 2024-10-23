// server/controllers/categoryController.js
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({ category: id })
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new category (Admin only)
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};
