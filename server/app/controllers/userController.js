import User from "../models/User.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

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

// create permission
export const createPermission = async (req, res) => {
  const { name } = req.body;
  const permission = new Permission({ name });
  await permission.save();
  res.status(201).json(permission);
}

//delete permission
export const deletePermission = async (req, res) => {
  await Permission.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Permission deleted' });
}

//create role
export const createRole = async (req, res) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });
  await role.save();
  res.status(201).json(role);
}

//delete role
export const deleteRole = async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Role deleted' });
}

// Assign permission to role
export const assignPermissionsToRole = async (req, res) => {
  const { permissionId } = req.body;
  const role = await Role.findById(req.params.roleId);
  if (!role.permissions.includes(permissionId)) {
    role.permissions.push(permissionId);
  }
  await role.save();
  res.status(200).json(role);
}

// Assign role to user
export const assignRoleToUser = async (req, res) => {
  const { roleId } = req.body;
  const user = await User.findById(req.params.userId);
  if (!user.roles.includes(roleId)) {
    user.roles.push(roleId);
  }
  await user.save();
  res.status(200).json(user);
}

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
        path: 'roles',
        populate: {
          path: 'permissions',
          model: 'Permission',
        },
      })
      .populate('permissions'); // Populate user-specific permissions

    // Check if the user has the required permission either from their roles or direct permissions
    const hasPermission = user.permissions.some(permission => permission.name === permissionName) ||
      user.roles.some(role =>
        role.permissions.some(permission => permission.name === permissionName)
      );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    next();
  };
};
