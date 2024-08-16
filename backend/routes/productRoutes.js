// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// Get all products or products by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {}; // Filter by category if provided
    const products = await Product.find(filter).exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
