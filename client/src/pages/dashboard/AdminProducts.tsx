import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import useProducts from "../../hooks/useProducts";
import defaultImage from "../../assets/default-product-image.jpg";
import axios from "axios";
import { Product } from "../../components/ProductsComponent";
import EditProductModal from "../../components/dashboard/EditProductModal";
import ShowProductModal from "../../components/dashboard/ShowProductModal"; // Import the new modal

const AdminProducts: React.FC = () => {
  const fetchedProducts = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false); // State for view modal

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
          `http://localhost:5000/api/products/${selectedProduct._id}`,
          selectedProduct
        );
        setIsModalOpen(false);
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
        await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle View Product click
  const handleViewClick = (product: Product) => {
    setSelectedProduct(product);
    setIsShowModalOpen(true);
  };

  const handleShowModalClose = () => {
    setSelectedProduct(null);
    setIsShowModalOpen(false);
  };

  return (
    <div>
      <div className="overflow-x-auto">
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
                      <MdDeleteForever className="h-6 w-6" />
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
    </div>
  );
};

export default AdminProducts;
