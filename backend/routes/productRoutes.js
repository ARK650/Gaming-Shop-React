// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// Get products by category
router.get("/products/:category", async (req, res) => {
  try {
    const category = req.params.category.replace(/-/g, " "); // Convert URL-friendly names back to regular
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
