import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "one-cart-12844.firebaseapp.com",
  projectId: "one-cart-12844",
  storageBucket: "one-cart-12844.firebasestorage.app",
  messagingSenderId: "830191383013",
  appId: "1:830191383013:web:ccd59efdd1fbcd6d91ff0c",
  measurementId: "G-JGYZE4DXNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=new getAuth(app);
const provider=new GoogleAuthProvider()


export {auth,provider}