const express = require("express");
const router = express.Router();
const {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../app/controllers/product.controller");

// Router making connection between route and controller
router.post("/", createProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
