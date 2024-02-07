import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

console.log("hi");
console.log("i am in firebase congif");
console.log(import.meta.env.TEST_VAR);
console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_STORAGE_BUCKET);

const firebaseConfig = {

  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
