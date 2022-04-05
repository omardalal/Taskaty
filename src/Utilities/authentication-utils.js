import { db, auth } from "./firebase-utils";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const errorCode = {
  invalidEmail: "auth/invalid-email",
  invalidPassword: "auth/invalid-password",
  emailAlreadyExists: "auth/email-already-exists"
};
export const createUser = async (email, password) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error);
  }
};
export const signInUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error);
  }
};
export const signOutUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw new Error(error);
  }
};
export const isLoggedIn = async (auth) => {
  try {
    return await auth.currentUser;
  } catch (error) {
    throw new Error(error);
  }
};
export const addUserToFirestore = async (
  email,
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
  try {
    return await setDoc(doc(db, "users", email), {
      email,
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
  } catch (error) {
    throw new Error(error);
  }
};
