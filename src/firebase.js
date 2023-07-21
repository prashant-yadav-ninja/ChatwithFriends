import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn6ps7J-36cdiU46rS0LqJvSd3Fp_uoEI",
  authDomain: "chat-95d13.firebaseapp.com",
  projectId: "chat-95d13",
  storageBucket: "chat-95d13.appspot.com",
  messagingSenderId: "885387094104",
  appId: "1:885387094104:web:489141207c846ca5c7422d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth() ;
export const storage = getStorage();
export  const db = getFirestore() ;