import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../components/ProductsComponent";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // for first time data loda using useEffect
  useEffect(() => {
    axios
      .get("https://mernshopdev.vercel.app/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  // hook is just a function, have a return values, Reuren state variable so that it can reuse
  // Return an object
  return categories;
};

export default useCategories;
