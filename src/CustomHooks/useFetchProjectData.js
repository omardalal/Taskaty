import { useEffect, useState } from "react";
import { getClassById } from "../Utilities/ClassUtils";
import {
  getProjectByID,
  getProjectGroup,
  isPartOfProject
} from "../Utilities/ProjectUtils";
import {
  getProjectSubmissionByProjectId,
  getProjectTasks,
  getSubmissionsByProjectId,
  getSubmissionsByTaskId
} from "../Utilities/TaskUtils";

export const useFetchProjectData = (loggedUser, projectId, taskId, refresh) => {
  const [isInstructor, setIsInstructor] = useState(false);
  const [isInClass, setIsInClass] = useState(undefined);
  const [isUserAuthorized, setIsUserAuthorized] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [gradingData, setGradingData] = useState([]);

  useEffect(() => {
    const checkUserAuth = async () => {
      return await isPartOfProject(loggedUser?.user?.email, projectId);
    };

    const getTasks = async () => await getProjectTasks(projectId);

    const getProjectClass = async () => {
      const projectGroup = await getProjectGroup(projectId);
      if (projectGroup == null) {
        return null;
      }
      setIsInClass(projectGroup?.classRef?.id);
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
  }, [loggedUser, isInstructor, refresh]);

  useEffect(() => {
    if (!projectId) {
      return;
    }
    const getProject = async () => {
      const prj = await getProjectByID(projectId);
      return { ...prj, ...{ id: projectId } };
    };

    const getSubmissions = async () =>
      taskId
        ? await getSubmissionsByTaskId(taskId)
        : await getSubmissionsByProjectId(projectId);

    const getGradingData = async () =>
      await getProjectSubmissionByProjectId(projectId);

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

    getGradingData()
      .then((grading) => setGradingData(grading))
      .catch((err) =>
        console.error("Failed to fetch project final submission, Error: " + err)
      );
  }, [projectId, taskId]);

  return [
    isInstructor,
    isInClass,
    isUserAuthorized,
    tasks,
    projectData,
    submissions,
    gradingData
  ];
};
