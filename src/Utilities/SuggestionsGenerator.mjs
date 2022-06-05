import { getDocs, collection } from "firebase/firestore";
import { getFirebaseDb } from "./FirebaseUtils";


/// TargetUser Object will be passed to the function in this format ///

// const targetUser = {
//   city: "ramallah",
//   major: "Computer Science",
//   university: "Birzeit",
//   interests :["drawing"]
// };

/* 
  Function will be called this way and it will return a sorted array 
  (based on the score for each user) of the desired size. 
 */

// getSuggestions(targetUser, 2, "city", true, true, true);


export function getSuggestions(
  targetUser,
  suggestionsCount,
  mostImportantFactor,
  useUniversity,
  useMajor,
  useLocation
) {

  (async () => {

    const suggestedUsers = new Map(); // suggestUser Email as a key and the value is his score. 
    const usersRef = collection(getFirebaseDb, "users");
    const projectsRef = collection(getFirebaseDb, "Project");

    await getDocs(usersRef)
      .then(snapshot => {    
        snapshot.docs.forEach(doc => {

          let userScore = 0;

          console.log(doc.get("city") === targetUser.city);
          if (useLocation && doc.get("city") === targetUser.city)
            userScore += mostImportantFactor === "location" ? 5 : 1;

          if (useMajor && doc.get("major") === targetUser.major)
            userScore += mostImportantFactor === "major" ? 5 : 1;

          if (useUniversity && doc.get("university") === targetUser.university)
            userScore += mostImportantFactor === "university" ? 5 : 1;

          const userInterests = doc.get("interests");

          for (let i = 0; i < userInterests.length; i++)
            if (targetUser.interests.includes(userInterests[i]))
              userScore += mostImportantFactor === "interests" ? 3 : 1;
          suggestedUsers.set(doc.id, userScore);

        });    
      })

      .catch(err => {
        console.log(err.message);
      });

      




    const mapSort1 = new Map([...suggestedUsers.entries()].sort((a, b) => b[1] - a[1])); 
    // sorting the (users, score) map based on the score of each user


    let users = Array.from(mapSort1.keys());
    users = users.slice(0, suggestionsCount);

    for(let i = 0; i < users.length; i++) 
      console.log(users[i]);


    return users.slice(0, suggestionsCount);

  })(

  );



}