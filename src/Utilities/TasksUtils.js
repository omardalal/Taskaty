import { getFirebaseDb } from "./FirebaseUtils";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp
} from "firebase/firestore";

export const returnTasks = async (projectId) => {
  const projectRef = doc(getFirebaseDb(), "Project", projectId);
  const queryTasks = query(
    collection(getFirebaseDb(), "Task"),
    where("parent project", "==", projectRef)
  );
  const querySnapshot = await getDocs(queryTasks);
  const tasks = [];
  querySnapshot.forEach((task) => {
    tasks.push(task.data());
  });
  return tasks;
};
export const createTask = async (
  createdById,
  description,
  name,
  projectId,
  status
) => {
  const createdByRef = doc(getFirebaseDb(), "users", createdById);
  const projectRef = doc(getFirebaseDb(), "Project", projectId);
  const tasks = query(collection(getFirebaseDb(), "Task"));
  const tasksDocs = await getDocs(tasks);
  console.log(tasksDocs);
  return await addDoc(collection(getFirebaseDb(), "Task"), {
    "assigned member": "",
    "created by": createdByRef,
    "created on": Timestamp.now(),
    description: description,
    name: name,
    number: tasksDocs?.size + 1 ?? 1,
    "parent project": projectRef,
    status: status
  });
};
export const changeStatusOfTask = async (status, taskId) => {
  const taskRef = doc(getFirebaseDb(), "Task", taskId);
};
