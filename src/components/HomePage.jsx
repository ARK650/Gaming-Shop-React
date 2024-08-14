import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories and products when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(productResponse.data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Render products grouped by category
  return (
    <div>
      <Navbar categories={categories} />
      <h1>Welcome to the Gaming Shop</h1>
      <div>
        {categories.map((category) => (
          <div key={category._id}>
            <h2>{category.name}</h2>
            <div className="product-grid">
              {products
                .filter((product) => product.category === category._id)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
