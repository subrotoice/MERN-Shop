import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductHeader from "./ProductHeader";

export interface Category {
  _id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  rating: number;
  stock: number;
  createdAt: string;
}

const ProductsComponent = ({ categoryId }: { categoryId?: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(
        categoryId
          ? `https://mernshopdev.vercel.app/api/categories/${categoryId}`
          : "https://mernshopdev.vercel.app/api/products"
      )
      .then((res) => setProducts(res.data)) // Success or No Error
      .catch((err) => console.log(err.message)); // Fail or Error
  }, []);

  return (
    <div>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-6xl px-4 2xl:px-0">
          {/* Heading & Filters */}
          <ProductHeader />
          {/* Product listing with card start */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="w-full text-center">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Show more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsComponent;
