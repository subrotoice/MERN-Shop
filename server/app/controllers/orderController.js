import Order from "../models/Order.js";
import User from "../models/User.js";

// Create Order API
export const createOrder = async (req, res) => {
  const { user, products, shippingAddress, phoneNumber, totalPrice } = req.body;

  // Validation: Ensure required fields are provided
  if (!user || !products || !shippingAddress || !phoneNumber || !totalPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const firebaseUid = await User.findOne({ firebaseUid: user });
  // return res.status(200).json(firebaseUid);
  try {
    // Calculate total price
    // let totalPrice = 0;

    // for (const item of products) {
    //   const product = await Product.findById(item.product);
    //   if (!product) {
    //     return res
    //       .status(404)
    //       .json({ message: `Product with ID ${item.product} not found` });
    //   }
    //   totalPrice += product.price * (item.quantity || 1); // Multiply product price by quantity
    // }

    // Create the order
    const order = new Order({
      user: firebaseUid,
      products: products,
      shippingAddress,
      phoneNumber,
      totalPrice,
    });

    // Save order to the database
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order" });
  }
};

// Update order by ID
export const updateOrderById = async (req, res) => {
  const { status, shippingAddress, phoneNumber } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update fields if provided
    if (status) order.status = status;
    if (shippingAddress) order.shippingAddress = shippingAddress;
    if (phoneNumber) order.phoneNumber = phoneNumber;

    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
};
