const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  imageUrl: String,
});

module.exports = mongoose.model("Product", productSchema);
