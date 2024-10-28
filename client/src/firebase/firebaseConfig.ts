// Import the necessary functions from Firebase SDK (v9 Modular Syntax)
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCNW9Sj29IGu_NiOkUNhuv_UPiRpwyUYk",
  authDomain: "nodeapp-d7efa.firebaseapp.com",
  projectId: "nodeapp-d7efa",
  storageBucket: "nodeapp-d7efa.appspot.com",
  messagingSenderId: "523408934036",
  appId: "1:523408934036:web:a0931815aa86ce371be081",
  measurementId: "G-HK0BTFPL8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
