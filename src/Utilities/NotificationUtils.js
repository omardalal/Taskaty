import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  getDoc
} from "firebase/firestore";
import { getFirebaseDb } from "./FirebaseUtils";
import { notificationTypes } from "../Constants/lookupConstants";

// return notifications for specific user
export const getNotifications = async (userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  const q = query(
    collection(getFirebaseDb(), "Notification"),
    where("user", "==", userRef)
  );
  const querySnapshot = await getDocs(q);
  const notifications = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    notifications.push(data);
  });
  return notifications;
};
// create group invitation notification for specific user
export const createNotificationForGroupInvitation = async (userId, status) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    status: status,
    type: notificationTypes[0],
    user: userRef
  });
};
// create project invitation notification for specific user
export const createNotificationForProjectInvitation = async (
  userId,
  status
) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    status: status,
    type: notificationTypes[1],
    user: userRef
  });
};
// create new meeting notification for specific user
export const createNotificationForNewMeeting = async (userId, meetingDate) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    "meeting date": meetingDate,
    type: notificationTypes[2],
    user: userRef
  });
};
// create new announcement notification for specific user
export const createNotificationForNewAnnouncement = async (
  userId,
  instructorId
) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  const instructorRef = doc(getFirebaseDb(), "users", instructorId);
  const instructorDoc = await getDoc(instructorRef);
  const instructorData = instructorDoc.data();
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    body:
      instructorData.firstName +
      " " +
      instructorData.lastName +
      " has an announcement",
    type: notificationTypes[6],
    user: userRef
  });
};
// create new task notification for specific user
export const createNotificationForNewTask = async (userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    body: "New task Created",
    type: notificationTypes[5],
    user: userRef
  });
};
// create new task submission notification for specific user
export const createNotificationForNewTaskSubmission = async (userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    body: "New task submitted",
    type: notificationTypes[8],
    user: userRef
  });
};
// create task submission comment notification for specific user
export const createNotificationForTaskSubmissionComment = async (userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    body: "New task submission comment",
    type: notificationTypes[7],
    user: userRef
  });
};
// create task assigned notification for specific user
export const createNotificationForTaskAssigned = async (userId) => {
  const userRef = doc(getFirebaseDb(), "users", userId);
  return await addDoc(collection(getFirebaseDb(), "Notification"), {
    body: "You have been assigned to a task",
    type: notificationTypes[9],
    user: userRef
  });
};
