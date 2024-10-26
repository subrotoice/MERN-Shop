import Product from "../models/Product.js";

// Controller has all business logic and it use model to talk with db
const createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const populatedProduct = await product.populate("category");
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Products list
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    // const product = await Product.findById(id, "price");
    const product = await Product.findById(id);
    // const populatedProduct = await product.populate("category").execPopulate();
    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );
    res.status(201).json(populatedProduct);
    // res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export all functions
export {
  createProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
