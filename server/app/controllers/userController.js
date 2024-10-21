// server/controllers/userController.js
import User from "../models/User.js";

// Register or update user after Firebase authentication
export const registerOrUpdateUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Update user if exists
      user.name = name || user.name;
      await user.save();
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } else {
      // Create new user
      user = new User({
        firebaseUid: req.user.uid, // Firebase UID from token
        name,
        email,
      });
      await user.save();
      return res
        .status(201)
        .json({ message: "User registered successfully", user });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
