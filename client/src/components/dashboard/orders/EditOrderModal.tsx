import React, { useState } from "react";
import { Order } from "../../../hooks/useOrders";

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  onUpdate: () => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  isOpen,
  onClose,
  order,
  setOrder,
  onUpdate,
}) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setOrder(updatedOrder);
    onUpdate();
  };

  if (!isOpen) return null;

  return (
    <dialog id="edit_order_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Order</h3>

        <div className="form-control mb-4">
          <label className="label">Shipping Address</label>
          <input
            type="text"
            name="shippingAddress"
            value={updatedOrder.shippingAddress}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={updatedOrder.phoneNumber}
            onChange={handleInputChange}
            className="input input-bordered"
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

export default EditOrderModal;
