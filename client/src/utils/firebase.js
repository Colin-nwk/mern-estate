// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-be350.firebaseapp.com",
  projectId: "mern-be350",
  storageBucket: "mern-be350.appspot.com",
  messagingSenderId: "906264010455",
  appId: "1:906264010455:web:4743ced35aecd475f89a92",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
