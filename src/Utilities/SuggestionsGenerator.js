/* eslint-disable no-unreachable */
import { getDocs, collection } from "firebase/firestore";
import { getUser, isInClass } from "./ClassUtils";
import { getFirebaseDb } from "./FirebaseUtils";
import { getProjectByID } from "./ProjectUtils";

export const getSuggestions = async (
  targetUserId,
  targetProjectId,
  classId,
  suggestionsCount,
  mostImportantFactor,
  useUniversity,
  useMajor,
  useLocation
) => {
  const suggestedUsers = new Map(); // suggestUser Email as a key and the value is his score.
  const usersRef = collection(getFirebaseDb(), "users");
  const targetUser = await getUser(targetUserId);
  const targetProject = await getProjectByID(targetProjectId);

  await getDocs(usersRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === targetUserId) {
          return;
        }
        let userScore = 0;

        if (useLocation && doc.get("city") === targetUser?.city)
          userScore += mostImportantFactor === "location" ? 5 : 1;

        if (useMajor && doc.get("major") === targetUser?.major)
          userScore += mostImportantFactor === "major" ? 5 : 1;

        if (useUniversity && doc.get("university") === targetUser?.university)
          userScore += mostImportantFactor === "university" ? 5 : 1;

        const userInterests = doc.get("interests");
        const userSkills = doc.get("skills");

        for (let i = 0; i < userInterests.length; i++)
          if (targetUser?.interests.includes(userInterests[i]))
            userScore += mostImportantFactor === "interests" ? 3 : 1;

        for (let i = 0; i < userSkills.length; i++)
          if (targetUser?.interests.includes(userSkills[i]))
            userScore += mostImportantFactor === "skills" ? 3 : 1;

        for (let i = 0; i < targetProject?.skills?.length; i++) {
          if (targetUser?.interests.includes(targetProject?.skills?.[i]))
            userScore += mostImportantFactor === "interests" ? 3 : 1;
        }

        for (let i = 0; i < targetProject?.skills?.length; i++)
          if (targetUser?.skills.includes(targetProject?.skills?.[i]))
            userScore += mostImportantFactor === "skills" ? 3 : 1;

        suggestedUsers.set(doc.data(), userScore);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  // sorting the (users, score) map based on the score of each user
  const mapSort1 = new Map(
    [...suggestedUsers.entries()].sort((a, b) => b[1] - a[1])
  );

  let users = Array.from(mapSort1.keys());

  if (classId) {
    users = await Promise.all(
      users?.map(async (user) => {
        const inClass = await isInClass(classId, user.email);
        return { ...user, inClass };
      })
    );
    return users?.filter((user) => user.inClass);
  }

  users = users?.slice(0, suggestionsCount);
  return users;
};
