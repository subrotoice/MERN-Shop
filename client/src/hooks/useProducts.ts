import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../components/ProductsComponent";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return products;
};

export default useProducts;
