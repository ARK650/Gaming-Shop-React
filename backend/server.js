const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Make sure this is here to load the .env file

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api", categoryRoutes);
app.get("/api/products", async (req, res) => {
  try {
    const category = req.query.category;
    const products = await Product.find(category ? { category } : {});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
