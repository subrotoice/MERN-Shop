import React, { useState } from "react";
import axios from "axios";
import { Order } from "../../../hooks/useOrders";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (order: Order) => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onOrderCreated,
}) => {
  const [newOrder, setNewOrder] = useState({
    user: "",
    products: [],
    totalPrice: 0,
    shippingAddress: "",
    phoneNumber: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://mernshopdev.vercel.app/api/orders",
        newOrder
      );
      onOrderCreated(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="create_order_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Order</h3>

        <div className="form-control mb-4">
          <label className="label">Shipping Address</label>
          <input
            type="text"
            name="shippingAddress"
            value={newOrder.shippingAddress}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={newOrder.phoneNumber}
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

export default CreateOrderModal;
