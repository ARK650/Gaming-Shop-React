const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// Get products by category
router.get("/products", async (req, res) => {
  try {
    const category = req.query.category; // Use query parameter to filter products
    const products = await Product.find(category ? { category } : {});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
