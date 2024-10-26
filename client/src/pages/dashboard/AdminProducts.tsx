// AdminProducts.tsx
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import useProducts from "../../hooks/useProducts";
import defaultImage from "../../assets/default-product-image.jpg";
import axios from "axios";
import { Product } from "../../components/ProductsComponent";
import EditProductModal from "../../components/dashboard/EditProductModal";

const AdminProducts: React.FC = () => {
  const products = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      try {
        await axios.put(
          `http://localhost:5000/api/products/${selectedProduct._id}`,
          selectedProduct
        );
        setIsModalOpen(false); // Close modal after update
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
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
                    <button>
                      <FaEye className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleEditClick(product)}>
                      <LuPencilLine className="h-6 w-6" />
                    </button>
                    <button>
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
    </div>
  );
};

export default AdminProducts;
