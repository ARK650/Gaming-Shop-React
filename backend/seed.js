const mongoose = require("mongoose");
const Category = require("./models/categories");
const Product = require("./models/products"); // Add this line for the product model
const fs = require("fs");
const path = require("path");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const seedData = async () => {
  try {
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "categories.json"), "utf-8")
    );
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf-8")
    );

    const categories = await Category.insertMany(categoriesData);
    console.log("Categories seeded successfully!");

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    const updatedProductsData = productsData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(updatedProductsData);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};
seedData();
