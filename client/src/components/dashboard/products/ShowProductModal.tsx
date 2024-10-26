import React from "react";
import defaultImage from "../../../assets/default-product-image.jpg";
import { Product } from "../../ProductsComponent";

interface ShowProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShowProductModal: React.FC<ShowProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <img
          src={product.imageUrl || defaultImage}
          alt={product.name}
          className="mb-4 w-full h-48 object-cover rounded-md"
        />
        <p>
          <strong>Category:</strong>{" "}
          {product.category ? product.category.name : "N/A"}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> {product.price}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowProductModal;
