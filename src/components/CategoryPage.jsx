// src/components/CategoryPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList";
import Navbar from "./Navbar";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?category=${categoryName}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

  return (
    <div>
      <Navbar categories={categories} />
      <h2>{categoryName}</h2>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
