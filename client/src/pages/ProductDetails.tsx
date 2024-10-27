import axios from "axios";
import { useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import productDefaultImage from "../assets/default-product-image.jpg";
import { Product } from "../components/ProductsComponent";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { _id, name, description, imageUrl, price, rating } =
    useLoaderData() as Product;
  const { user } = useAuth();
  // console.log(user);
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const handleOrder = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const orderData = {
        user: user.uid,
        products: [{ product: _id, quantity: 1 }],
        shippingAddress,
        phoneNumber,
        totalPrice: price,
      };

      const response = await axios.post(
        "https://mernshopdev.vercel.app/api/orders",
        orderData
      );
      console.log("Order created:", response.data);
      setOrderModalOpen(false);
      toast.success("Order Placed Successfully", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full dark:hidden"
                src={imageUrl || productDefaultImage}
                alt={name}
              />
              <img
                className="w-full hidden dark:block"
                src={imageUrl || productDefaultImage}
                alt={name}
              />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <div className="badge badge-success gap-2 bg-green-200">
                In Stock
              </div>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {name}
              </h1>
              <div className="flex gap-2 align-middle">
                <Rating
                  allowFraction
                  initialValue={rating || 0.0}
                  readonly
                  SVGstyle={{ display: "inline" }}
                  size={20}
                />{" "}
                ({rating || 0.0})<span className="underline">345 Reviews</span>
                <span className="text-blue-600 flex items-center h-8">
                  <BiLocationPlus /> Meherpur Sadar, Meherpur 23647
                </span>
              </div>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  ${price}
                </p>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  className="flex gap-2 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                  onClick={() => setOrderModalOpen(true)}
                >
                  <FaHeartCircleCheck className="h-6 w-6 text-red-400" />
                  Add to favorites
                </button>
                <button
                  className="text-white mt-4 sm:mt-0 gap-2 bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600"
                  onClick={() => setOrderModalOpen(true)}
                >
                  Buy Now
                </button>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {isOrderModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Complete Your Order</h3>
            <p>
              <strong>Product:</strong> {name}
            </p>
            <p>
              <strong>User:</strong> {user?.displayName}
            </p>

            <div className="form-control mb-4">
              <label className="label">Shipping Address</label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="input input-bordered"
                placeholder="Enter shipping address"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input input-bordered"
                placeholder="Enter phone number"
              />
            </div>

            <div className="modal-action flex justify-end gap-2">
              <button onClick={handleOrder} className="btn btn-primary">
                Submit Order
              </button>
              <button onClick={() => setOrderModalOpen(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
