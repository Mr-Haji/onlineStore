
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZlN6IJa4VHKAoBhnyuxZ-9e621Q9NpwY",
  authDomain: "online-store-ee0ab.firebaseapp.com",
  projectId: "online-store-ee0ab",
  storageBucket: "online-store-ee0ab.appspot.com",
  messagingSenderId: "900816599606",
  appId: "1:900816599606:web:785085c0435202c34f7697",
  measurementId: "G-59S2CYNXR9"
};

const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);
const DATABASE = getDatabase(app);
const STORAGE= getStorage(app , "gs://online-store-ee0ab.appspot.com")

export  { AUTH, DATABASE, STORAGE }