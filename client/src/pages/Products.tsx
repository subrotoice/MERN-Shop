import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ProductsComponent from "../components/ProductsComponent";

const Products = () => {
  const { id } = useParams();

  return (
    <div>
      {id ? <ProductsComponent categoryId={id} /> : <ProductsComponent />}
      <Footer />
    </div>
  );
};

export default Products;
