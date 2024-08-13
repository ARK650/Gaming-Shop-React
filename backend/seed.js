const mongoose = require("mongoose");
const Category = require("./models/categories");
const Product = require("./models/products");
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
      fs.readFileSync(path.join(__dirname, "data", "categories.json"), "utf-8")
    );
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf-8")
    );

    // Insert categories and retrieve the inserted documents
    const insertedCategories = await Category.insertMany(categoriesData);
    console.log("Categories seeded successfully!");

    // Create a mapping of category names to their respective ObjectId
    const categoryMap = {};
    insertedCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    // Update the products data to replace category names with ObjectId
    const updatedProductsData = productsData.map((product) => {
      return {
        ...product,
        category: categoryMap[product.category], // Replace category name with ObjectId
      };
    });

    await Product.insertMany(updatedProductsData);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedData();
