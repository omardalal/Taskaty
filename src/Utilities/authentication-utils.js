import { db, auth } from "./firebase-utils";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const createUser = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => {
  return await signOut(auth);
};
export const isLoggedIn = async (auth) => {
  return await auth.currentUser;
};
export const addUserToFirestore = async (
  email,
  password,
  firstName,
  lastName,
  university,
  work,
  major,
  graduate,
  country,
  city,
  skills,
  interests
) => {
  return await setDoc(doc(db, "users", email), {
    email,
    password,
    firstName,
    lastName,
    university,
    work,
    major,
    graduate,
    country,
    city,
    skills,
    interests
  });
};
