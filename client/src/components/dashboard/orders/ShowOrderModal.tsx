import React from "react";
import { Order } from "../../../hooks/useOrders";

interface ShowOrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShowOrderModal: React.FC<ShowOrderModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p>
          <strong>User:</strong> {order.user.name}
        </p>
        <p>
          <strong>Products:</strong>
        </p>
        <ul>
          {order.products.map((item) => (
            <li key={item.product._id}>
              {item.product.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total Price:</strong> ${order.totalPrice}
        </p>
        <p>
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </p>
        <p>
          <strong>Phone Number:</strong> {order.phoneNumber}
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

export default ShowOrderModal;
