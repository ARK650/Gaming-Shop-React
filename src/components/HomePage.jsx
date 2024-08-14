// src/components/HomePage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Gaming Shop</h1>
      <div>
        <h2>High-End PCs</h2>
        <div className="product-grid">
          {products
            .filter((product) => product.category === "high end")
            .map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2>Mid-Range PCs</h2>
        <div className="product-grid">
          {products
            .filter((product) => product.category === "mid range")
            .map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Repeat similar sections for other categories (Budget, Professional, Gaming Laptops) */}
    </div>
  );
};
