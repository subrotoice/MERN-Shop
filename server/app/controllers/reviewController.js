import Product from "../models/Product.js";
import Review from "../models/Review.js";

// Create Review API
export const createReview = async (req, res) => {
  const { user, product, rating, comment } = req.body;

  //   return res.status(200).json(req.body);
  // Validation: Ensure required fields are provided
  if (!user || !product || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create the review
    const review = new Review({
      user,
      product,
      rating,
      comment,
    });

    // Save review to the database
    await review.save();

    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};
