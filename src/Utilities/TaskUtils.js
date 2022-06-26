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
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

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

export const deleteFileFromSubmission = async (taskSubId, index) => {
  const taskRef = doc(getFirebaseDb(), "Task Submission", taskSubId);
  const task = await getSubmissionById(taskSubId);
  if (!task?.files) {
    return;
  }

  return await updateDoc(taskRef, {
    files: task?.files?.filter((file, indx) => indx !== index)
  });
};

export const deleteFileFromProjectSubmission = async (prjSubmission, index) => {
  const taskRef = doc(getFirebaseDb(), "ProjectSubmission", prjSubmission);
  const task = await getProjectSubmissionById(prjSubmission);
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

export const getSubmissionById = async (submissionId) => {
  const taskSubRef = doc(getFirebaseDb(), "Task Submission", submissionId);
  const taskSubDoc = await getDoc(taskSubRef);
  return taskSubDoc.data();
};

export const getProjectSubmissionById = async (submissionId) => {
  const subRef = doc(getFirebaseDb(), "ProjectSubmission", submissionId);
  const subDoc = await getDoc(subRef);
  return subDoc.data();
};

export const getProjectSubmissionByProjectId = async (projectId) => {
  const subQuery = query(
    collection(getFirebaseDb(), "ProjectSubmission"),
    where("projectId", "==", projectId)
  );
  const querySnapshot = await getDocs(subQuery);

  const submissions = [];
  querySnapshot.forEach((doc) => {
    submissions.push({ ...doc.data(), ...{ id: doc.id } });
  });

  return submissions?.[0];
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

export const addSubmissionComment = async (userId, submissionId, body) => {
  const taskRef = doc(getFirebaseDb(), "Task Submission", submissionId);
  return await updateDoc(taskRef, {
    comments: arrayUnion({
      body,
      date: Timestamp.now(),
      user: userId
    })
  });
};

export const approveSubmission = async (userId, submissionId) => {
  const taskRef = doc(getFirebaseDb(), "Task Submission", submissionId);
  return await updateDoc(taskRef, {
    approvedBy: arrayUnion(userId)
  });
};

export const updateSubmissionDescription = async (
  submissionId,
  description
) => {
  const taskRef = doc(getFirebaseDb(), "Task Submission", submissionId);
  return await updateDoc(taskRef, {
    description
  });
};

// upload files for specific task
export const uploadFileForTask = async (file, taskId) => {
  const taskRef = doc(getFirebaseDb(), "Task", taskId);
  for (var i = 0; i < file.length; i++) {
    const fileExtension = file[i].name?.substring(
      file[i].name?.lastIndexOf("."),
      file[i].name?.length
    );
    const fileRef = ref(
      getStorage(),
      "files/" + file[i].name + v4() + fileExtension
    );
    await uploadBytes(fileRef, file[i]).then(async () => {
      await updateDoc(taskRef, {
        files: arrayUnion({
          date: Timestamp.now(),
          fileType: file[i].type,
          fileName: file[i].name,
          link: await getDownloadURL(fileRef)
        })
      });
    });
  }
};
// upload files for specific task submission
export const uploadFileForTaskSubmission = async (file, taskSubmissionId) => {
  const taskSubmissionRef = doc(
    getFirebaseDb(),
    "Task Submission",
    taskSubmissionId
  );
  for (var i = 0; i < file.length; i++) {
    const fileExtension = file[i].name?.substring(
      file[i].name?.lastIndexOf("."),
      file[i].name?.length
    );
    const fileRef = ref(
      getStorage(),
      "files/" + file[i].name + v4() + fileExtension
    );
    await uploadBytes(fileRef, file[i]).then(async () => {
      await updateDoc(taskSubmissionRef, {
        files: arrayUnion({
          fileType: file[i].type,
          fileName: file[i].name,
          link: await getDownloadURL(fileRef),
          date: Timestamp.now()
        })
      });
    });
  }
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
  for (var i = 0; i < file.length; i++) {
    const fileExtension = file[i].name?.substring(
      file[i].name?.lastIndexOf("."),
      file[i].name?.length
    );
    const fileRef = ref(
      getStorage(),
      "files/" + file[i].name + v4() + fileExtension
    );
    await uploadBytes(fileRef, file).then(async () => {
      await updateDoc(projectSubmissionRef, {
        files: arrayUnion({
          date: Timestamp.now(),
          fileType: file[i].type,
          fileName: file[i].name,
          link: await getDownloadURL(fileRef)
        })
      });
    });
  }
};
// upload files for specific class and announcement
export const uploadFileForAnnouncement = async (file, classId, index) => {
  const classRef = doc(getFirebaseDb(), "Class", classId);
  const classDoc = await getDoc(classRef);
  const classDaTa = classDoc.data();
  const announcement = classDaTa?.announcements;
  console.log(announcement);
  for (let i = 0; i < file.length; i++) {
    const fileExtension = file[i].name?.substring(
      file[i].name?.lastIndexOf("."),
      file[i].name?.length
    );
    const fileRef = ref(
      getStorage(),
      "files/" + file[i].name + v4() + fileExtension
    );

    try {
      await uploadBytes(fileRef, file[i]);
      const announcementFiles =
        announcement[index ?? announcement?.length - 1]?.files;
      const downloadURL = await getDownloadURL(fileRef);
      announcementFiles?.push({
        date: Timestamp.now(),
        fileName: file[i].name,
        fileType: file[i].type,
        link: downloadURL
      });
      announcement[index ?? announcement?.length - 1] = {
        ...announcement[index ?? announcement?.length - 1],
        files: announcementFiles
      };
      await updateDoc(classRef, {
        announcements: announcement
      });
    } catch (err) {
      throw new Error(err);
    }
  }
};

export const gradeProject = async (submissionId, comment, grade) => {
  const taskRef = doc(getFirebaseDb(), "ProjectSubmission", submissionId);
  return await updateDoc(taskRef, {
    comment: comment ?? "",
    grade: grade ?? 0
  });
};
