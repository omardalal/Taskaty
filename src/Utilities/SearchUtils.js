import { getFirebaseDb } from "./FirebaseUtils";
import { collection, query, getDocs, where } from "firebase/firestore";

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
  let q = query(collection(getFirebaseDb(), "users"));
  if (academicLevel) {
    q = query(q, where("graduate", "==", academicLevel));
  }
  if (major) {
    q = query(q, where("major", "==", major));
  }
  if (university) {
    q = query(q, where("university", "==", university));
  }
  if (city) {
    q = query(q, where("city", "==", city));
  }

  const querySnapshot = await getDocs(q);

  let results = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });

  if (name) {
    results = results.filter((result) => {
      return (
        result.firstName.toLowerCase().includes(name.toLowerCase()) ||
        result.lastName.toLowerCase().includes(name.toLowerCase())
      );
    });
  }

  if (work) {
    results = results.filter((result) => {
      return result.work.toLowerCase().includes(work.toLowerCase());
    });
  }

  if (skills?.length) {
    results = results.filter((result) => {
      return result.skills.some((skill) => {
        return skills.includes(skill);
      });
    });
  }

  if (interests?.length) {
    results = results.filter((result) => {
      return result.interests.some((interest) => {
        return interests.includes(interest);
      });
    });
  }

  return results;
};
