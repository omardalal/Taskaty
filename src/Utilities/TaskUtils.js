import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp
} from "firebase/firestore";
import { getFirebaseDb } from "./FirebaseUtils";

export const getProjectTasks = async (projectId) => {
  const taskQuery = query(
    collection(getFirebaseDb(), "Task"),
    where("projectId", "==", projectId)
  );
  const querySnapshot = await getDocs(taskQuery);

  const allTasks = [];
  querySnapshot.forEach((doc) => {
    allTasks.push({ ...doc.data(), ...{ id: doc.id } });
  });

  return allTasks;
};

export const getTask = async (taskId) => {
  const taskRef = doc(getFirebaseDb(), "Task", taskId);
  const taskDoc = await getDoc(taskRef);
  return taskDoc.data();
};

export const getSubmissionsByTaskId = async (taskId) => {
  const subQuery = query(
    collection(getFirebaseDb(), "Task Submission"),
    where("taskId", "==", taskId)
  );
  const querySnapshot = await getDocs(subQuery);

  const submissions = [];
  querySnapshot.forEach((doc) => {
    submissions.push({ ...doc.data(), ...{ id: doc.id } });
  });

  return submissions;
};

export const getSubmissionsByProjectId = async (projectId) => {
  const subQuery = query(
    collection(getFirebaseDb(), "Task Submission"),
    where("projectId", "==", projectId)
  );
  const querySnapshot = await getDocs(subQuery);

  const submissions = [];
  querySnapshot.forEach((doc) => {
    submissions.push({ ...doc.data(), ...{ id: doc.id } });
  });

  return submissions;
};

export const editTask = async (
  taskId,
  { assignedTo, status, description, name }
) => {
  const taskRef = doc(getFirebaseDb(), "Task", taskId);

  return await updateDoc(taskRef, {
    assignedTo,
    status,
    description,
    name
  });
};

export const deleteFileFromTask = async (taskId, index) => {
  const taskRef = doc(getFirebaseDb(), "Task", taskId);
  const task = await getTask(taskId);
  if (!task?.files) {
    return;
  }

  return await updateDoc(taskRef, {
    files: task?.files?.filter((file, indx) => indx !== index)
  });
};

// export const addFileToTask = async (taskId, newFiles) => {
//   const targetProjectRef = doc(getFirebaseDb(), "Project", projectID);
// const filesToUpload = newFiles.map((file) => ({
//   name: file.name,
//   type: file.type,
//   data: Timestamp.now(),
//   link: ""
// }));
//   return await updateDoc(targetProjectRef, {
//     files: arrayUnion()
//   });
// };

export const addSubmission = async (
  submittedBy,
  taskId,
  projectId,
  description,
  files
) => {
  return await addDoc(collection(getFirebaseDb(), "Task Submission"), {
    description,
    taskId,
    submittedBy,
    submittedOn: Timestamp.now(),
    files: files ?? [],
    projectId,
    comments: [],
    approvedBy: []
  });
};

export const createTask = async (
  name,
  projectId,
  description,
  assignedTo,
  files,
  createdBy
) => {
  return await addDoc(collection(getFirebaseDb(), "Task"), {
    name,
    projectId,
    status: "New",
    createdOn: Timestamp.now(),
    files: files ?? [],
    assignedTo,
    description,
    createdBy
  });
};
