// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importe getAuth
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt-FvJW-PJ-i_lLNaPcMGX8BVg0OgMYrE",
  authDomain: "estoqque-app.firebaseapp.com",
  projectId: "estoqque-app",
  storageBucket: "estoqque-app.firebasestorage.app",
  messagingSenderId: "970651925142",
  appId: "1:970651925142:web:1acbf81d49f3cca8d1a0b7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use getAuth para inicializar a autenticação
export const db = getFirestore(app);