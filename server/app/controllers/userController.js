import User from "../models/User.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

// Register or update user after Firebase authentication
export const registerOrUpdateUser = async (req, res) => {
  const { displayName, email, uid, photoURL } = req.body;
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
        photoURL,
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
    const users = await User.find().populate("roles").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const editUser = async (req, res) => {
  try {
    const { name, email, phone, address, photoURL } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, phone, address, photoURL },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user information", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from request parameters
    const user = await User.findByIdAndDelete(userId); // Delete user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found case
    }

    res.status(200).json({ message: "User deleted successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error }); // Error response
  }
};

export const getUserByFirebaseUid = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid }).populate("roles");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};


// get all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

//create role
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

//delete role
export const deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error delete user", error });
  }
};

// Assign role to user
export const assignRoleToUser = async (req, res) => {
  try {
    const { roleId } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error assigning roles", error });
  }
};

// detach role
export const detachRoleFromUser = async (req, res) => {
  try {
    const { roleId } = req.body;
    const user = await User.findById(req.params.userId);
    user.roles = user.roles.filter((role) => role.toString() !== roleId);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error detaching role", error });
  }
};


// check permission method, this will be used in routes

// Example route for creating a role (admin-only permission)
//
// router.post('/roles', verifyToken, checkPermission('create_role'), async (req, res) => {
//   const role = new Role(req.body);
//   await role.save();
//   res.status(201).json(role);
// });

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id)
      .populate({
        path: "roles",
        populate: {
          path: "permissions",
          model: "Permission",
        },
      })
      .populate("permissions"); // Populate user-specific permissions

    // Check if the user has the required permission either from their roles or direct permissions
    const hasPermission =
      user.permissions.some(
        (permission) => permission.name === permissionName
      ) ||
      user.roles.some((role) =>
        role.permissions.some(
          (permission) => permission.name === permissionName
        )
      );

    if (!hasPermission) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};
