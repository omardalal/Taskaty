import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
  Timestamp
} from "firebase/firestore";
import { getFirebaseDb } from "./FirebaseUtils";

// upload files for specific task
export const uploadFileForTask = async (file, taskId) => {
  const taskRef = doc(getFirebaseDb(), "Task", taskId);

  const fileRef = ref(getStorage(), "files/" + file.name + v4());
  return await uploadBytes(fileRef, file).then(async () => {
    await updateDoc(taskRef, {
      files: arrayUnion({
        date: Timestamp.now(),
        fileName: file.name,
        link: await getDownloadURL(fileRef)
      })
    });
  });
};
// upload files for specific task submission
export const uploadFileForTaskSubmission = async (file, taskSubmissionId) => {
  const taskSubmissionRef = doc(
    getFirebaseDb(),
    "Task Submission",
    taskSubmissionId
  );
  const fileRef = ref(getStorage(), "files/" + file.name + v4());
  return await uploadBytes(fileRef, file).then(async () => {
    await updateDoc(taskSubmissionRef, {
      files: arrayUnion({
        fileType: file.type,
        fileName: file.name,
        link: await getDownloadURL(fileRef)
      })
    });
  });
};
// upload files for specific project submission
export const uploadFileForProjectSubmission = async (
  file,
  projectSubmissionId
) => {
  const projectSubmissionRef = doc(
    getFirebaseDb(),
    "ProjectSubmission",
    projectSubmissionId
  );

  const fileRef = ref(getStorage(), "files/" + file.name + v4());
  return await uploadBytes(fileRef, file).then(async () => {
    await updateDoc(projectSubmissionRef, {
      files: arrayUnion({
        date: Timestamp.now(),
        fileType: file.type,
        fileName: file.name,
        link: await getDownloadURL(fileRef)
      })
    });
  });
};
// upload files for specific announcement
export const uploadFileForAnnouncement = async (file, classId, index) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);
  const classDoc = await getDoc(classRef);
  const classDaTa = classDoc.data();
  const announcement = classDaTa?.announcements;
  console.log(announcement);
  const fileRef = ref(getStorage(), "files/" + file.name + v4());

  try {
    await uploadBytes(fileRef, file);
    const announcementFiles = announcement[index]?.files;
    const downloadURL = await getDownloadURL(fileRef);
    announcementFiles?.push({
      date: Timestamp.now(),
      fileName: file.name,
      fileType: file.type,
      link: downloadURL
    });
    await updateDoc(classRef, {
      announcements: { ...announcement, files: announcementFiles }
    });
  } catch (err) {
    // yes3edha
  }
};
