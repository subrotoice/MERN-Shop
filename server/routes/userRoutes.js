// server/routes/userRoutes.js
import express from "express";
import {
  registerOrUpdateUser,
  getAllUsers,
  createPermission,
  createRole,
  deletePermission,
  deleteRole,
  assignPermissionsToRole,
  assignRoleToUser
} from "../app/controllers/userController.js";
import verifyToken from "../app/middlewares/verifyToken.js";
import admin from "../app/config/firebaseConfig.js";

const userRoutes = express.Router();

// Route to register or update user after Firebase authentication
userRoutes.post("/register", verifyToken, registerOrUpdateUser);
// userRoutes.post("/register", registerOrUpdateUser);
// userRoutes.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userResponse = await admin.auth().createUser({
//       email: email,
//       password: password,
//     });
//     res.json(userResponse);
//     // res.json(req.body);
//   } catch (error) {
//     res.json(error.errorInfo);
//   }
//   // res.json(req.body);
// });

// Route to get all users (admin-only route)
// userRoutes.get("/all", verifyToken, getAllUsers);

userRoutes.get("/all", getAllUsers);
userRoutes.post("/permissions", createPermission);
userRoutes.delete("/permissions/:id", deletePermission);
userRoutes.post("/roles", createRole);
userRoutes.delete("/roles/:id", deleteRole);
userRoutes.put('/roles/:roleId/permissions', assignPermissionsToRole);
userRoutes.put('/users/:userId/roles', assignRoleToUser);

export default userRoutes;
