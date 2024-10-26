import React from "react";
import { Category } from "../../ProductsComponent";

interface ShowCategoryModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShowCategoryModal: React.FC<ShowCategoryModalProps> = ({
  category,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
        <p>
          <strong>Description:</strong> {category.description}
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

export default ShowCategoryModal;
