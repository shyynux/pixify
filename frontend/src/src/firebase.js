import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDK2g4SG6UZt2vVYZ6Sgp91pXvyEhcYhZc",
  authDomain: "pixifie-2f67b.firebaseapp.com",
  projectId: "pixifie-2f67b",
  storageBucket: "pixifie-2f67b.appspot.com",
  messagingSenderId: "697867786353",
  appId: "1:697867786353:web:2054f2d7d437688b4d63d0",
  measurementId: "G-CNBXT1WG8R"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
