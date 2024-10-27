import React, { useState, useEffect } from "react";
import { FaChevronDown, FaEye } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import useProducts from "../../hooks/useProducts";
import defaultImage from "../../assets/default-product-image.jpg";
import axios from "axios";
import { Product } from "../../components/ProductsComponent";
import EditProductModal from "../../components/dashboard/products/EditProductModal";

import CreateProductModal from "../../components/dashboard/products/CreateProductModal"; // Import the create modal
import toast from "react-hot-toast";
import ShowProductModal from "../../components/dashboard/products/ShowProductModal";

const AdminProducts: React.FC = () => {
  const fetchedProducts = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create modal

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    if (selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod._id === selectedProduct._id ? selectedProduct : prod
        )
      );
      try {
        await axios.put(
          `https://mernshopdev.vercel.app/api/products/${selectedProduct._id}`,
          selectedProduct
        );
        setIsModalOpen(false);
        toast.success("Product Updated");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleDelete = async (product: Product) => {
    const isConfirm = confirm(`Are you sure to delete ${product.name}?`);
    if (isConfirm) {
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod._id !== product._id)
      );
      try {
        await axios.delete(
          `https://mernshopdev.vercel.app/api/products/${product._id}`
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleViewClick = (product: Product) => {
    setSelectedProduct(product);
    setIsShowModalOpen(true);
  };

  const handleShowModalClose = () => {
    setSelectedProduct(null);
    setIsShowModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleProductCreated = (newProduct: Product) => {
    toast.success("Product Creted");
    setProducts([newProduct, ...products]);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              type="button"
              id="createProductModalButton"
              data-modal-target="createProductModal"
              data-modal-toggle="createProductModal"
              className="btn btn-primary btn-sm"
              onClick={handleCreateModalOpen}
            >
              Add product
            </button>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                Filter
                <FaChevronDown className="ml-2" />
              </button>
              <div
                id="filterDropdown"
                className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </h6>
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="filterDropdownButton"
                >
                  <li className="flex items-center">
                    <input
                      id="apple"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="apple"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Apple (56)
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Description</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product.imageUrl || defaultImage}
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm opacity-50">
                        {product.category && product.category.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.description}</td>
                <td>
                  Rating: {product.rating} <br /> Stock: {product.stock}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleViewClick(product)}>
                      <FaEye className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleEditClick(product)}>
                      <LuPencilLine className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleDelete(product)}>
                      <MdDeleteForever className="h-6 w-6 text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedProduct && (
        <EditProductModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          product={selectedProduct}
          setProduct={setSelectedProduct}
          onUpdate={handleUpdate}
        />
      )}

      {isShowModalOpen && selectedProduct && (
        <ShowProductModal
          isOpen={isShowModalOpen}
          onClose={handleShowModalClose}
          product={selectedProduct}
        />
      )}

      {isCreateModalOpen && (
        <CreateProductModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onProductCreated={handleProductCreated}
        />
      )}
    </div>
  );
};

export default AdminProducts;
