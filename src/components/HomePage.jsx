import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./HomePage.css"; // Ensure you create this CSS file for styling

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
              className="category-item"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="product-list">
        {selectedCategory ? (
          products
            .filter((product) => product.category === selectedCategory)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
        ) : (
          <p>Select a category to view products.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
