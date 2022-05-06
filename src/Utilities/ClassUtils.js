import {
  collection,
  query,
  getDocs,
  getDoc,
  addDoc,
  where,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  FieldValue
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./FirebaseUtils";

export const getClasses = async (userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  console.log(userRef);
  const q = query(collection(getFirebaseDb(), "Class"));
  const querySnapshot = await getDocs(q);
  const classes = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const arr = data.students;
    arr.forEach((index) => {
      console.log(index.studentRef);
      if (index.studentRef.id === userRef.id) {
        classes.push(doc.data());
      }
    });
  });

  return classes;
};
// return sections in specific class
export const returnSections = async (classRoomID) => {
  const classDocRef = doc(getFirebaseDb(), "Class", classRoomID);
  const classDoc = await getDoc(classDocRef);
  const classData = classDoc.data();
  return classData.Sections;
};
// return the groups in specific section
export const returnGroups = async (classSectionId, classRoomId) => {
  const classDocRef = doc(getFirebaseDb(), "Class", classRoomId);
  const classDoc = await getDoc(classDocRef);
  const classData = classDoc.data();
  const sections = classData.Sections;
  console.log(sections[classSectionId - 1]);
};
// add user to class
export const addToClass = async (classId, sectionNumber, userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await updateDoc(doc(getFirebaseDb(), "Class", classId), {
    students: arrayUnion({
      sectionNumber: parseInt(sectionNumber),
      studentRef: userRef
    })
  });
};
// add user to group
export const addToGroup = async (groupId, user) => {
  console.log("groupLength<maxStudents");

  const groupRef = doc(getFirebaseDb(), "Group", groupId);

  const userRef = doc(getFirebaseDb(), "users", user);

  console.log(groupRef);

  const q = query(collection(getFirebaseDb(), "Class"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const classSections = data.Sections;
    classSections.forEach((Section) => {
      const groupArr = Section.groups;
      groupArr.forEach(async (element) => {
        if (element.path === groupRef.path) {
          const maxStudentInGroup = Section.maxStudentsInGroup;
          const group = (await getDoc(groupRef)).data();
          // console.log(group);
          const groupLength = group.students.length;
          // console.log(maxStudentInGroup);
          if (groupLength < maxStudentInGroup) {
            return await updateDoc(groupRef, {
              students: arrayUnion({
                userRef
              })
            });
          }
        }
      });
    });
  });
};
export const addGroupInvitation = async (fromUserId, toUserId, groupId) => {
  const fromUserRef = doc(getFirebaseDb(), "users", fromUserId);
  const toUserRef = doc(getFirebaseDb(), "users", toUserId);
  const groupRef = doc(getFirebaseDb(), "Group", groupId);
  return await addDoc(collection(getFirebaseDb(), "Group Invitation"), {
    fromUser: fromUserRef,
    group: groupRef,
    toUser: toUserRef
  });
};

export const createClass = async () => {
  return await addDoc(collection(getFirebaseDb(), "Class"), {});
};
// create group for specific section in a class
export const createGroupForSection = async (
  groupName,
  projectId,

  classId,
  sectionNumber
) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);
  const projectRef = doc(getFirebaseDb(), "Project", projectId);
  const groupRef = await addDoc(collection(getFirebaseDb(), "Group"), {
    groupName: groupName,
    project: projectRef
  });
  const sectionArr = (await getDoc(classRef)).data().Sections;
  const groupArr = sectionArr[sectionNumber - 1].groups;
  console.log(groupArr.groups);
  if (groupArr.length < sectionArr[sectionNumber - 1].maxNumOfGroups) {
    sectionArr[sectionNumber - 1].groups.push(groupRef);
  }
  console.log(groupArr.groups);

  console.log(sectionArr);
  return await updateDoc(classRef, {
    Sections: sectionArr
  });
};
// return group data from Group collection
export const returnGroup = async (groupRef) => {
  const groupDocRef = doc(getFirebaseDb(), "Group", groupRef);
  const groupDoc = await getDoc(groupDocRef);
  return groupDoc.data();
};
// return student information from users collection
export const returnStudent = async (studentRef) => {
  const studentDocRef = doc(getFirebaseDb(), "users", studentRef);
  const studentDoc = await getDoc(studentDocRef);
  return studentDoc.data();
};
// return project information from Project collection
export const returnProject = async (projectRef) => {
  const projectDocRef = doc(getFirebaseDb(), "Project", projectRef);
  const projectDoc = await getDoc(projectDocRef);
  return projectDoc.data();
};
