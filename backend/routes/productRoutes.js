const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
