import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true, // Unique Firebase UID for each user
  },
  name: {
    type: String,
    required: true, // User's full name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  phone: {
    type: String,
    required: false, // User's phone number
  },
  address: {
    type: String, // Optional field for user's address
  },
  photoURL: {
    type: String, // URL to the user's profile picture
    default: "", // Can be empty by default
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation time
  },
});

const User = mongoose.model("User", userSchema);

export default User;
