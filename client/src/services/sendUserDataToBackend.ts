import axios from "axios";
import { Auth, UserCredential } from "firebase/auth";

// Send user data to the backend
export const sendUserDataToBackend = async (
  userData: UserCredential,
  auth: Auth
) => {
  try {
    // Get the Firebase ID token from the current user
    const token = await auth.currentUser?.getIdToken();

    // Send the request to the backend with the token in headers
    const response = await axios.post(
      "https://mernshopdev.vercel.app/api/users/register", // Backend route
      userData.user, // User data (name, email, etc.)
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the Firebase token in Authorization header
        },
      }
    );

    console.log(token);

    return response;
  } catch (error) {
    console.error("Error sending user data to backend:", error);
    throw error;
  }
};

export default sendUserDataToBackend;
