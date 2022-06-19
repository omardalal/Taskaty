import { useEffect, useState } from "react";
import { getClassById } from "../Utilities/ClassUtils";
import {
  getProjectByID,
  getProjectGroup,
  isPartOfProject
} from "../Utilities/ProjectUtils";
import {
  getProjectTasks,
  getSubmissionsByProjectId,
  getSubmissionsByTaskId
} from "../Utilities/TaskUtils";

export const useFetchProjectData = (loggedUser, projectId, taskId, refresh) => {
  const [isInstructor, setIsInstructor] = useState(false);
  const [isInClass, setIsInClass] = useState(false);
  const [isUserAuthorized, setIsUserAuthorized] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const checkUserAuth = async () => {
      return await isPartOfProject(loggedUser?.user?.email, projectId);
    };

    const getProject = async () => {
      const prj = await getProjectByID(projectId);
      return { ...prj, ...{ id: projectId } };
    };

    const getTasks = async () => await getProjectTasks(projectId);

    const getSubmissions = async () =>
      taskId
        ? await getSubmissionsByTaskId(taskId)
        : await getSubmissionsByProjectId(projectId);

    const getProjectClass = async () => {
      const projectGroup = await getProjectGroup(projectId);
      if (projectGroup == null) {
        return null;
      }
      setIsInClass(true);
      const projectClass = getClassById(projectGroup?.classRef?.id);
      return projectClass;
    };

    getProjectClass()
      .then((projectClass) => {
        setIsInstructor(
          loggedUser?.user?.email === projectClass?.instructor?.id
        );
      })
      .catch((err) =>
        console.error(`Failed to get project class, Error: ${err}`)
      );

    checkUserAuth()
      .then((auth) => {
        setIsUserAuthorized(auth || isInstructor);
      })
      .catch((err) =>
        console.error(`Failed to get user access, Error: ${err}`)
      );

    getTasks()
      .then((prjTasks) => {
        setTasks(prjTasks);
      })
      .catch((err) =>
        console.error(`Failed to get project tasks, Error: ${err}`)
      );

    getProject()
      .then((projects) => {
        setProjectData(projects);
      })
      .catch((err) =>
        console.error(`Failed to get user projects, Error: ${err}`)
      );

    getSubmissions()
      .then((subs) => setSubmissions(subs))
      .catch((err) =>
        console.error("Failed to fetch task submissions, Error: " + err)
      );
  }, [loggedUser, isInstructor, refresh]);

  return [
    isInstructor,
    isInClass,
    isUserAuthorized,
    tasks,
    projectData,
    submissions
  ];
};
