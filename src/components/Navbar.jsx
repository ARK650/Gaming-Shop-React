// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css"; // You can add custom styles here

export const Navbar = ({ categories }) => {
  return (
    <nav className="navbar">
      <h1>Gaming Shop</h1>
      <ul className="navbar-links">
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`/category/${category.name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
