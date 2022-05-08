import {
  collection,
  query,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./FirebaseUtils";

export const getClasses = async () => {
  const user = getFirebaseAuth().currentUser;

  const userRef = doc(getFirebaseDb(), "users", user.email);
  const q = query(collection(getFirebaseDb(), "Class"));
  const querySnapshot = await getDocs(q);
  const classes = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const arr = data.students;
    arr.forEach((index) => {
      if (index.studentRef.id === userRef.id) {
        classes.push(doc.data());
      }
    });
  });

  return classes;
};

export const getSections = (classRoom) => {
  return classRoom.Sections;
};

export const getGroups = (classSection) => {
  return classSection.groups;
};

export const addToClass = async (link1) => {
  const paramString = link1.split("?")[1];
  const queryString = new URLSearchParams(paramString);
  const classId = queryString.get("classroomId");
  const sectionNumber = queryString.get("sectionNumber");
  const user = getFirebaseAuth().currentUser;
  const userRef = doc(getFirebaseDb(), "users", user.email);
  return await updateDoc(doc(getFirebaseDb(), "Class", classId), {
    students: arrayUnion({
      sectionNumber: parseInt(sectionNumber),
      studentRef: userRef
    })
  });
};

export const addToGroup = async (link1) => {
  const paramString = link1.split("?")[1];
  const queryString = new URLSearchParams(paramString);
  const groupId = queryString.get("groupId");
  const groupRef = doc(getFirebaseDb(), "Group", groupId);
  const fromUser = queryString.get("fromUser");
  const fromUserRef = doc(getFirebaseDb(), "users", fromUser);
  const user = getFirebaseAuth().currentUser;
  const userRef = doc(getFirebaseDb(), "users", user.email);

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
          const groupLength = group.students.length;
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

export const addGroupInvitation = async (groupLink) => {
  const paramString = groupLink.split("?")[1];
  const queryString = new URLSearchParams(paramString);
  const fromUser = queryString.get("fromUser");
  const toUser = queryString.get("toUser");
  const groupId = queryString.get("groupId");
  const fromUserRef = doc(getFirebaseDb(), "users", fromUser);
  const toUserRef = doc(getFirebaseDb(), "users", toUser);
  const groupRef = doc(getFirebaseDb(), "Group", groupId);
  return await addDoc(collection(getFirebaseDb(), "Group Invitation"), {
    fromUser: fromUserRef,
    group: groupRef,
    toUser: toUserRef
  });
};

// pass the sections array, announcements array and students array
export const createClass = async (sections, announcements, students) => {
  return await addDoc(collection(getFirebaseDb(), "Class"), {
    Sections: sections,
    announcements: announcements,
    students: students
  });
};

export const createGroupForSection = async (
  groupName,
  project,
  students,
  classId,
  sectionNumber
) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);

  const groupRef = await addDoc(collection(getFirebaseDb(), "Group"), {
    groupName: groupName,
    project: project,
    students: students
  });
  const sectionArr = (await getDoc(classRef)).data().Sections;
  const groupArr = sectionArr[sectionNumber - 1].groups;
  if (groupArr.length < sectionArr[sectionNumber - 1].maxNumOfGroups) {
    sectionArr[sectionNumber - 1].groups.push(groupRef);
  }

  return await updateDoc(classRef, {
    Sections: sectionArr
  });
};

export const getGroup = async (groupRef) => {
  const groupDoc = doc(getFirebaseDb(), "Group", groupRef);
  const docSnap = await getDoc(groupDoc);
  return docSnap.data();
};

export const getStudent = async (studentRef) => {
  const studentDoc = await doc(getFirebaseDb(), "users", studentRef);
  const docSnap = await getDoc(studentDoc);
  return docSnap.data();
};

export const getProject = async (projectRef) => {
  const projectDoc = await doc(getFirebaseDb(), "Project", projectRef);
  const docSnap = await getDoc(projectDoc);
  return docSnap.data();
};
