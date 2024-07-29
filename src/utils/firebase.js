import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBEY35N_PQA4e4BohcmboYCedfVb8r9A0Q",
    authDomain: "gamesource-b1de3.firebaseapp.com",
    projectId: "gamesource-b1de3",
    storageBucket: "gamesource-b1de3.appspot.com",
    messagingSenderId: "406680062771",
    appId: "1:406680062771:web:e96841e6cf765f9e948c46",
    measurementId: "G-S7C0EWRM0Y"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore and get a reference to the service
const DB = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const AUTH = getAuth(app);

export {DB, AUTH}