// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ add this
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFguIfygtLsqM3R6Bwkqbp_V3u60oUdaI",
  authDomain: "kaam-kaazi.firebaseapp.com",
  projectId: "kaam-kaazi",
  storageBucket: "kaam-kaazi.firebasestorage.app",
  messagingSenderId: "1039484887154",
  appId: "1:1039484887154:web:9be8e57fbcd54ec2b6a2eb",
  measurementId: "G-R70M1XQH5D",
};  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ export Firestore
export const storage = getStorage(app);