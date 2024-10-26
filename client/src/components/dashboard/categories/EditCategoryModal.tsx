import React, { useState } from "react";
import { Category } from "../../ProductsComponent";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  onUpdate: (updatedCategory: Category) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  setCategory,
  onUpdate,
}) => {
  const [updatedCategory, setUpdatedCategory] = useState(category);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCategory(updatedCategory);
    onUpdate(updatedCategory);
  };

  if (!isOpen) return null;

  return (
    <dialog id="edit_category_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Category</h3>

        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={updatedCategory.name}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Description</label>
          <textarea
            name="description"
            value={updatedCategory.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered"
          />
        </div>

        <div className="modal-action">
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditCategoryModal;
