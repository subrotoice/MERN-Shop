import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import useOrders, { Order } from "../../hooks/useOrders";
import axios from "axios";

import toast from "react-hot-toast";
import CreateOrderModal from "../../components/dashboard/orders/CreateOrderModal";
import EditOrderModal from "../../components/dashboard/orders/EditOrderModal";
import ShowOrderModal from "../../components/dashboard/orders/ShowOrderModal";

const AdminOrders: React.FC = () => {
  const fetchedOrders = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setOrders(fetchedOrders);
  }, [fetchedOrders]);

  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    if (selectedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((ord) =>
          ord._id === selectedOrder._id ? selectedOrder : ord
        )
      );
      try {
        await axios.put(
          `https://mernshopdev.vercel.app/api/orders/${selectedOrder._id}`,
          selectedOrder
        );
        setIsModalOpen(false);
        toast.success("Order Updated");
      } catch (error) {
        console.error("Error updating order:", error);
      }
    }
  };

  const handleDelete = async (order: Order) => {
    const isConfirm = confirm(`Are you sure to delete order ${order._id}?`);
    if (isConfirm) {
      setOrders((prevOrders) =>
        prevOrders.filter((ord) => ord._id !== order._id)
      );
      try {
        await axios.delete(
          `https://mernshopdev.vercel.app/api/orders/${order._id}`
        );
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleViewClick = (order: Order) => {
    setSelectedOrder(order);
    setIsShowModalOpen(true);
  };

  const handleShowModalClose = () => {
    setSelectedOrder(null);
    setIsShowModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleOrderCreated = (newOrder: Order) => {
    toast.success("Order Created");
    setOrders([newOrder, ...orders]);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <button
          onClick={handleCreateModalOpen}
          className="btn btn-primary btn-sm mb-4"
        >
          Add Order
        </button>
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user.name}</td>
                <td>${order.totalPrice}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.phoneNumber}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleViewClick(order)}>
                      <FaEye className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleEditClick(order)}>
                      <LuPencilLine className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleDelete(order)}>
                      <MdDeleteForever className="h-6 w-6 text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <EditOrderModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          order={selectedOrder}
          setOrder={setSelectedOrder}
          onUpdate={handleUpdate}
        />
      )}

      {isShowModalOpen && selectedOrder && (
        <ShowOrderModal
          isOpen={isShowModalOpen}
          onClose={handleShowModalClose}
          order={selectedOrder}
        />
      )}

      {isCreateModalOpen && (
        <CreateOrderModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onOrderCreated={handleOrderCreated}
        />
      )}
    </div>
  );
};

export default AdminOrders;
