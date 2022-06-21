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
import { getFirebaseDb } from "./FirebaseUtils";

// return the classes using the user ID
export const getClasses = async (userId) => {
  if (!userId) {
    return;
  }
  const userRef = doc(getFirebaseDb(), "users", userId);
  const q = query(collection(getFirebaseDb(), "Class"));
  const querySnapshot = await getDocs(q);
  const classes = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const arr = data.students;
    if (data.instructor.id === userId) {
      classes.push({ ...doc.data(), ...{ id: doc.id } });
      return;
    }
    arr?.forEach((index) => {
      if (index.studentRef.id === userRef.id) {
        classes.push({ ...doc.data(), ...{ id: doc.id } });
      }
    });
  });

  return classes;
};

// get class data by id
export const getClassById = async (classRoomID) => {
  const classDocRef = doc(getFirebaseDb(), "Class", classRoomID);
  const classDoc = await getDoc(classDocRef);
  const classData = classDoc.data();
  return classData;
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
  return sections[classSectionId - 1];
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
  const groupRef = doc(getFirebaseDb(), "Group", groupId);

  const userRef = doc(getFirebaseDb(), "users", user);

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

// create class , has empty sections and announcements
export const createClass = async (
  className,
  classCode,
  description,
  instructorId
) => {
  const instructorRef = doc(getFirebaseDb(), "users", instructorId);
  return await addDoc(collection(getFirebaseDb(), "Class"), {
    Sections: [],
    announcements: [],
    courseCode: classCode,
    courseDesc: description,
    courseName: className,
    instructor: instructorRef,
    students: []
  });
};

// create announcement for specific class
export const createAnnouncement = async (title, body, classId) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);
  return await updateDoc(classRef, {
    announcements: arrayUnion({
      title: title,
      body: body,
      files: []
    })
  });
};

// create section for specific class
export const createSection = async (
  maxNumOfGroups,
  maxStudentInGroup,
  classId
) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);
  const classDoc = await getDoc(classRef);
  const classes = classDoc.data();
  const sections = classes.Sections;
  return await updateDoc(classRef, {
    Sections: arrayUnion({
      groups: [],
      maxNumOfGroups: maxNumOfGroups,
      maxStudentsInGroup: maxStudentInGroup,
      sectionNumber: sections?.length + 1 ?? 1
    })
  });
};

// create group for specific section in a class
export const createGroupForSection = async (
  groupName,
  userId,
  projectId,
  classId,
  sectionNumber
) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);
  const userRef = doc(getFirebaseDb(), "users", userId);
  const groupRef = await addDoc(collection(getFirebaseDb(), "Group"), {
    groupName: groupName,
    project: projectId ?? "",
    students: [{ userRef: userRef }],
    classRef,
    sectionNumber
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

// returns group data from Group collection
export const getGroup = async (groupRef) => {
  const groupDocRef = doc(getFirebaseDb(), "Group", groupRef);
  const groupDoc = await getDoc(groupDocRef);
  return groupDoc.data();
};

// returns user information from users collection
export const getUser = async (userRef) => {
  const usersDocRef = doc(getFirebaseDb(), "users", userRef);
  const usersDoc = await getDoc(usersDocRef);
  return usersDoc.data();
};

// returns project information from Project collection
export const getProject = async (projectRef) => {
  const projectDocRef = doc(getFirebaseDb(), "Project", projectRef);
  const projectDoc = await getDoc(projectDocRef);
  return projectDoc.data();
};

// return the name and the section number of the student if exists in the class
export const isInClass = async (classId, userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  const classRef = doc(getFirebaseDb(), "Class", classId);
  const classDoc = await getDoc(classRef);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  const classData = classDoc.data();
  const students = classData.students;

  let student;
  students?.forEach((Student) => {
    const studentId = Student.studentRef;

    if (studentId.path === userRef.path) {
      const studentInfo = {
        name: userData.firstName + " " + userData.lastName,
        sectionNumber: Student.sectionNumber
      };

      student = studentInfo;
    }
  });
  return student;
};

export const setGroupProject = async (groupId, projectID) => {
  const groupRef = doc(getFirebaseDb(), "Group", groupId);

  return await updateDoc(groupRef, {
    project: projectID
  });
};
