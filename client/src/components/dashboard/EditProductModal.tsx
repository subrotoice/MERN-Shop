// EditProductModal.tsx
import React from "react";
import { Product } from "../../components/ProductsComponent";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  onUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  setProduct,
  onUpdate,
}) => {
  if (!isOpen) return null;

  return (
    <dialog id="edit_product_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Product</h3>
        <p>{product._id}</p>
        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Description</label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
            className="textarea textarea-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Rating</label>
          <input
            type="number"
            value={product.rating}
            onChange={(e) =>
              setProduct((prev) =>
                prev ? { ...prev, rating: Number(e.target.value) } : null
              )
            }
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Stock</label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct((prev) =>
                prev ? { ...prev, stock: Number(e.target.value) } : null
              )
            }
            className="input input-bordered"
          />
        </div>

        <div className="modal-action">
          <button onClick={onUpdate} className="btn btn-primary">
            Update
          </button>
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditProductModal;
