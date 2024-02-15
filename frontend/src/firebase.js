import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-shop-22bf0.firebaseapp.com",
  projectId: "e-shop-22bf0",
  storageBucket: "e-shop-22bf0.appspot.com",
  messagingSenderId: "813997332636",
  appId: "1:813997332636:web:a617bb5aa5d381e4d83559",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
