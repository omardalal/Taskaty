import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  getDocs,
  getDoc
} from "firebase/firestore";
import { getFirebaseDb } from "./FirebaseUtils";

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

export const addNewProject = async (
  name,
  description,
  skills,
  subject,
  type,
  userId,
  initialMembers
) => {
  const members = [...initialMembers];
  if (!members.includes(userId)) {
    members.push(userId);
  }

  return await addDoc(collection(getFirebaseDb(), "Project"), {
    name,
    description,
    members,
    skills,
    subject,
    type
  });
};

export const removeProject = async (projcetID) => {
  return await deleteDoc(doc(getFirebaseDb(), "Project", projcetID));
};

export const addMemberToProject = async (memberEmail, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    members: arrayUnion(memberEmail)
  });
};

export const removeMemberFromProject = async (memberEmail, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    members: arrayRemove(memberEmail)
  });
};

export const addSkillToProject = async (skills, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  for (let i = 0; i < skills.length; i++) {
    await updateDoc(targetProjectRef, {
      skills: arrayUnion(skills[i])
    });
  }
};

export const removeSkillFromProject = async (skills, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    skills: arrayRemove(skills)
  });
};

export const changeProjectName = async (newName, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    name: newName
  });
};

export const changeProjectType = async (newType, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    type: newType
  });
};

export const changeProjectSubject = async (newSubject, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    subject: newSubject
  });
};

export const changeProjectDescription = async (newDescription, projectID) => {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);

  return await updateDoc(targetProjectRef, {
    description: newDescription
  });
};

export async function getUserProjects(memberEmail) {
  const projects = []; // suggestUser Email as a key and the value is his score.

  await (async () => {
    const projectsRef = collection(getFirebaseDb(), "Project");

    await getDocs(projectsRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.get("members").includes(memberEmail)) projects.push(doc.id);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  })();

  return projects;
}

export async function isPartOfProject(memberEmail, projectID) {
  let isPart = false;
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);
  const docSnap = await getDoc(targetProjectRef);

  if (docSnap.exists()) {
    const projectMembers = await docSnap.get("members");
    isPart = projectMembers?.includes(memberEmail);
  }
  return isPart;
}

export async function getProjectByID(projectID) {
  const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);
  const docSnap = await getDoc(targetProjectRef);
  const data = docSnap.data();

  return data;
}

export const getProjectGroup = async (projectId) => {
  const groupsRef = collection(getFirebaseDb(), "Group");
  let group = null;
  await getDocs(groupsRef)
    .then((snapshot) => {
      const targetGroup = snapshot.docs.find((doc) => {
        const prj = doc.get("project");
        if (prj === projectId) {
          return true;
        }
        return false;
      });
      group = targetGroup?.data() ?? null;
    })
    .catch((err) => {
      console.error(`Failed to get project group, Error: ${err}`);
    });
  return group;
};
