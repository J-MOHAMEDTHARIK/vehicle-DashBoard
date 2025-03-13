import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA98_24qG77d4uwU5SCX9yCQnMbv92E7vU",
  authDomain: "drivers-f52a9.firebaseapp.com",
  projectId: "drivers-f52a9",
  storageBucket: "drivers-f52a9.firebasestorage.app",
  messagingSenderId: "757369478852",
  appId: "1:757369478852:web:a60466b2e1d92a29977391",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
