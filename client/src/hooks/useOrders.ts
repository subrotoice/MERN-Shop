export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  products: {
    product: {
      _id: string;
      name: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
  shippingAddress: string;
  phoneNumber: string;
}

import axios from "axios";
import { useEffect, useState } from "react";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get("https://mernshopdev.vercel.app/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return orders;
};

export default useOrders;
