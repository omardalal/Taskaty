import { getFirebaseAuth, getFirebaseDb } from "./FirebaseUtils";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const AuthErrorCodes = {
  InvalidEmail: "auth/invalid-email",
  InvalidPassword: "auth/invalid-password",
  EmailAlreadyExists: "auth/email-already-exists"
};

export const createUser = async (email, password) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      password
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const signInUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  } catch (error) {
    throw new Error(error);
  }
};

export const signOutUser = async () => {
  try {
    return await signOut(getFirebaseAuth());
  } catch (error) {
    throw new Error(error);
  }
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
  try {
    return await setDoc(doc(getFirebaseDb(), "users", email), {
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
