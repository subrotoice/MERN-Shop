import React, { useState } from "react";
import axios from "axios";
import { Category } from "../../ProductsComponent";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (category: Category) => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onCategoryCreated,
}) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        newCategory
      );
      onCategoryCreated(response.data.category);
      onClose();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="create_category_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Category</h3>

        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Description</label>
          <textarea
            name="description"
            value={newCategory.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered"
          />
        </div>

        <div className="modal-action">
          <button onClick={handleCreate} className="btn btn-primary">
            Create
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CreateCategoryModal;
