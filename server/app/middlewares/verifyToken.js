// server/middleware/verifyToken.js
import admin from "../config/firebaseConfig.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded Firebase token to req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized", error });
  }
};

export default verifyToken;
