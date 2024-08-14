import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = ({ categories }) => {
  return (
    <nav className="navbar">
      <h1>Gaming Shop</h1>
      <ul className="navbar-links">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <Link to={`/category/${category.name}`}>{category.name}</Link>
            </li>
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Navbar;
