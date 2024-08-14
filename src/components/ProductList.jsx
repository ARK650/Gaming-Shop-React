import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

export const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired, // PropTypes.arrayOf(PropTypes.object) can be more specific
};
