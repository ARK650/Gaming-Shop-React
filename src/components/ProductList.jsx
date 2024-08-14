import PropTypes from "prop-types";

export const ProductList = ({ products = [] }) => {
  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
