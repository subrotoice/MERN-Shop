// Import the necessary functions from Firebase SDK (v9 Modular Syntax)
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ehawlsWmF8r0kb4qWL7wSNsh6HVywVQ",
  authDomain: "breaking-news-cfbca.firebaseapp.com",
  projectId: "breaking-news-cfbca",
  storageBucket: "breaking-news-cfbca.appspot.com",
  messagingSenderId: "371790083227",
  appId: "1:371790083227:web:4da5c666899abe60a2c23e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
