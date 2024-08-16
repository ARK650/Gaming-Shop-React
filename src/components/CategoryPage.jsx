// src/components/CategoryPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories to get the category ID
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        setCategories(response.data);
        const category = response.data.find((cat) => cat.name === categoryName);
        return category ? category._id : null;
      })
      .then((categoryId) => {
        if (categoryId) {
          // Fetch products by category ID
          axios
            .get(`http://localhost:5000/api/products?category=${categoryId}`)
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [categoryName]);

  return (
    <div>
      <Navbar categories={categories} />
      <h2>{categoryName}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
