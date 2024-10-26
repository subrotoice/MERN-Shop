import React, { useState } from "react";
import axios from "axios";
import { Product } from "../../components/ProductsComponent";
import useCategories from "../../hooks/useCategories";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: Product) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onProductCreated,
}) => {
  const categories = useCategories();

  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    stock: number;
    rating: number;
    imageUrl: string;
    category: string;
  }>({
    name: "",
    description: "",
    stock: 0,
    rating: 0,
    imageUrl: "",
    category: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewProduct((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      onProductCreated(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="create_product_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Product</h3>

        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleCategoryChange}
            className="select select-bordered"
          >
            <option disabled value="">
              Select a category
            </option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>

        <div className="form-control mb-4">
          <label className="label">Rating</label>
          <input
            type="number"
            name="rating"
            value={newProduct.rating}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Stock</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            className="input input-bordered"
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

export default CreateProductModal;
