const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product"); // Add this line for the product model
const fs = require("fs");
const path = require("path");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const seedData = async () => {
  try {
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "categories.json"), "utf-8")
    );
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
    );

    await Category.insertMany(categoriesData);
    console.log("Categories seeded successfully!");

    await Product.insertMany(productsData);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedData();
