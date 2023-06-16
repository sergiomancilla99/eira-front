// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging } from "firebase/messaging"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn7SYotNnowVuuLq8_DA8l4ce05EjD-NA",
  authDomain: "eira-f2c6a.firebaseapp.com",
  projectId: "eira-f2c6a",
  storageBucket: "eira-f2c6a.appspot.com",
  messagingSenderId: "188992673984",
  appId: "1:188992673984:web:dbd611dbc84afdacbef525"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const messaging = getMessaging(app)
