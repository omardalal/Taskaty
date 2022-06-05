import { initializeApp } from "firebase/app";
import {
  getFirestore, addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDocs, 
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfLcKw4_YYzbCO8B2stz9VNHl0kkySG6o",
  authDomain: "graduation-project-3bd85.firebaseapp.com",
  projectId: "graduation-project-3bd85",
  storageBucket: "graduation-project-3bd85.appspot.com",
  messagingSenderId: "829919598274",
  appId: "1:829919598274:web:2ef6b58ca66eb228e64d5b"
};

/*
  * addNewProject(name, description, skills, subject, type)
  * getProjectByID(projectID) : returns project object //use await
  * removeProject(projectID)
  * addMemberToProject(projectID, memberEmail)
  * removeMemberFromProject(projectID, memberEmail)
  * addSkillToProject(skill, projectID)
  * removeSkillFromProject(skill, projectID)
  * changeProjectName(newName, projectID)
  * changeProjectDescription(newDescription, projectID)
  * changeProjectType(newType, projectID)
  * changeProjectSubject(newSubject, projectID)
  * getUserProjects(memberEmail) : returns a list of project Ids that this user is part of.
  * isPartOfProject(memberEmail, projectID) : returns true or false. // use await
  * 
*/


// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

export const addNewProject = async (name, description, skills, subject, type) => {
  const members = [];

  return await addDoc(collection(db, "Project"), {
    name,
    description,
    members,
    skills,
    subject,
    type
  });
};

export const removeProject = async (projcetID) => {
  return await deleteDoc(doc(db, "Project", projcetID));
};

export const addMemberToProject = async (memberEmail, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  return await updateDoc(targetProjectRef, {
    members: arrayUnion(memberEmail),  
  });
};

export const removeMemberFromProject = async (memberEmail, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  return await updateDoc(targetProjectRef, {
    members: arrayRemove(memberEmail),  
  });
};

export const addSkillToProject = async (skills, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  
  for (let i = 0; i < skills.length; i++) {
    await updateDoc(targetProjectRef, {
      skills: arrayUnion(skills[i]),  
    });

  }
  
};

export const removeSkillFromProject = async (skills, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  return await updateDoc(targetProjectRef, {
    skills: arrayRemove(skills),  
  });
};

export const changeProjectName = async (newName, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  return await updateDoc(targetProjectRef, {
    name: newName, 
  });
};

export const changeProjectType = async (newType, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  console.log("hello there");

  return await updateDoc(targetProjectRef, {
    type: newType, 
  });
};

export const changeProjectSubject = async (newSubject, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  console.log("hello there");

  return await updateDoc(targetProjectRef, {
    subject: newSubject, 
  });
};

export const changeProjectDescription = async (newDescription, projectID) => {
  const targetProjectRef = doc(db, "Project", projectID);

  console.log("hello there");

  return await updateDoc(targetProjectRef, {
    description: newDescription, 
  });
};

export async function getUserProjects(memberEmail) {

  const projects = []; // suggestUser Email as a key and the value is his score. 

  await (async () => {

    const projectsRef = collection(db, "Project");

    await getDocs(projectsRef)
      .then(snapshot => {    
        snapshot.docs.forEach(doc => {
          
          if(doc.get("members").includes(memberEmail)) 
            projects.push(doc.id);
          
        });    
      })
      .catch(err => {
        console.log(err.message);
      });
  })(
  
  );
 
  return projects;
}

export async function isPartOfProject(memberEmail, projectID) {

  let isPart = false;
  const targetProjectRef = doc(db, "Project", projectID);
  const docSnap = await getDoc(targetProjectRef);


  if (docSnap.exists()) {
    const projectMembers = await docSnap.get("members");
    isPart = projectMembers.includes(memberEmail);
  } 
  return isPart;
}

export async function getProjectByID(projectID) {

  const targetProjectRef = doc(db, "Project", projectID);
  const docSnap = await getDoc(targetProjectRef);
  const data = docSnap.data();
  
  return data;

}




addSkillToProject(["TeST 1", "TERST2", "TEST3"], "mvWiNR2CzhlIJKQ4kK35");






// changeProjectName("Ahmad Hamzah", "mvWiNR2CzhlIJKQ4kK35");


