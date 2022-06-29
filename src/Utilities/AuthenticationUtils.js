import { getFirebaseAuth, getFirebaseDb } from "./FirebaseUtils";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

export const createUser = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    email?.toLowerCase(),
    password
  );
};

export const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
};

export const signOutUser = async () => {
  return await signOut(getFirebaseAuth());
};

// Test this
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
  return await setDoc(doc(getFirebaseDb(), "users", email?.toLowerCase()), {
    email: email?.toLowerCase(),
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

export const sendResetEmail = async (email) => {
  return await sendPasswordResetEmail(getFirebaseAuth(), email);
};
