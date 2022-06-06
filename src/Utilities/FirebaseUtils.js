import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfLcKw4_YYzbCO8B2stz9VNHl0kkySG6o",
  authDomain: "graduation-project-3bd85.firebaseapp.com",
  projectId: "graduation-project-3bd85",
  storageBucket: "graduation-project-3bd85.appspot.com",
  messagingSenderId: "829919598274",
  appId: "1:829919598274:web:2ef6b58ca66eb228e64d5b"
};

let auth = null;
let db = null;

const initFirebase = () => {
  if (!auth || !db) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
};

export const getFirebaseAuth = () => {
  initFirebase();
  return auth;
};

export const getFirebaseDb = () => {
  initFirebase();
  return db;
};
