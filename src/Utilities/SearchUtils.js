import { getFirebaseDb } from "./FirebaseUtils";
import { collection, query, getDocs } from "firebase/firestore";

export const getSearchResultsByFilters = async ({
  name,
  academicLevel,
  skills,
  interests,
  major,
  university,
  work,
  city
}) => {
  const q = query(collection(getFirebaseDb(), "users"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
