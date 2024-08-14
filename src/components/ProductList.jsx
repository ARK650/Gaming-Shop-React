import ProductCard from "./ProductCard";
import "./ProductList.css";

export const ProductList = ({ product }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
