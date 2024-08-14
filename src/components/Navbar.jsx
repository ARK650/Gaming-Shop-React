import PropTypes from "prop-types";

const Navbar = ({ categories }) => {
  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  categories: PropTypes.array.isRequired, // Again, can be more specific with arrayOf and object shape
};

export default Navbar;
