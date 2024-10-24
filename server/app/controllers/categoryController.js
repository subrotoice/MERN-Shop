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
    const products = await Product.find({ category: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new category (Admin only)
export const createCategory = async (req, res) => {
  const { name, description, icon } = req.body;
  // if (req.user.role !== "admin") {
  //   return res.status(403).json({ message: "Access denied: Admins only" });
  // }

  try {
    const newCategory = new Category({ name, description, icon });
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get a category by ID (Public)
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update a category (Admin only)
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, icon } = req.body;

  // Only admins can update categories
  // if (req.user.role !== "admin") {
  //   return res.status(403).json({ message: "Access denied: Admins only" });
  // }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, icon },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete a category (Admin only)
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  // Only admins can delete categories
  // if (req.user.role !== "admin") {
  //   return res.status(403).json({ message: "Access denied: Admins only" });
  // }

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
