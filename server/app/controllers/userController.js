import User from "../models/User.js";

// Register or update user after Firebase authentication
export const registerOrUpdateUser = async (req, res) => {
  const { displayName, email, uid } = req.body;
  // return res.status(200).json(req.body);

  try {
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, update their information
      user.name = displayName || user.name;
      await user.save();
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } else {
      // If user doesn't exist, create a new user
      user = new User({
        firebaseUid: uid, // Firebase UID from token
        name: displayName,
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
  // if (req.user.role !== "admin") {
  //   return res.status(403).json({ message: "Access denied: Admins only" });
  // }

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
