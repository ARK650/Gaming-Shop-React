import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
    </Router>
  );
};

export default App;
