import { query, where, collection } from "firebase/firestore";
import { getFirebaseDb } from "./FirebaseUtils";

export const searchUser = async (
  name,
  graduate,
  skills,
  interests,
  major,
  university,
  work,
  country,
  city
) => {
  if (name) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("name", "==", name)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (graduate) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("graduate", "==", graduate)
    );
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (skills) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("skills", "array-contains-any", skills)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (interests) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("interests", "array-contains-any", interests)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (major) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("major", "==", major)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (university) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("university", "==", university)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (work) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("work", "==", work)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (country) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("country", "==", country)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }
    if (city) {
      q = query(q, where("city", "==", city));
    }

    return await q;
  } else if (city) {
    let q = query(
      collection(getFirebaseDb, "users"),
      where("city", "==", city)
    );
    if (graduate) {
      q = query(q, where("graduate", "==", graduate));
    }
    if (skills) {
      q = query(q, where("skills", "array-contains-any", skills));
    }
    if (interests) {
      q = query(q, where("interests", "array-contains-any", interests));
    }
    if (major) {
      q = query(q, where("major", "==", major));
    }
    if (university) {
      q = query(q, where("university", "==", university));
    }
    if (work) {
      q = query(q, where("work", "==", work));
    }
    if (country) {
      q = query(q, where("country", "==", country));
    }
    if (name) {
      q = query(q, where("name", "==", name));
    }

    return await q;
  }
};
