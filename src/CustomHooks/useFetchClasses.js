import { useState, useEffect } from "react";
import { getClasses, getUser } from "../Utilities/ClassUtils";
import useAuth from "./useAuth";
import strings from "../Constants/strings";

export const useFetchClasses = (classId) => {
  const loggedUser = useAuth();
  const [userClasses, setUserClasses] = useState([]);

  useEffect(() => {
    if (!loggedUser.user) {
      return;
    }

    const getStudentsInfo = async (userClass) => {
      if (!userClass.students) {
        return [];
      }
      const students = await Promise.all(
        userClass?.students?.map(async (student) => {
          const studentId = student.studentRef?.id;
          const studentInfo = await getUser(studentId);
          return {
            id: studentId,
            sectionNumber: student.sectionNumber,
            ...studentInfo
          };
        })
      );
      return students;
    };

    const getUserClasses = async () => {
      const classesResponse = await getClasses(loggedUser.user?.email);

      const classes = classesResponse?.map((userClass) => {
        const sectionsCount = userClass.Sections?.length ?? 0;
        return {
          ...{
            title: userClass.courseName,
            subtitle: userClass.courseCode,
            extraInfo: `${sectionsCount ?? 0} ${
              sectionsCount === 1 ? "Section" : "Sections"
            }`,
            buttonText: strings.visitClass,
            visitURL: `/class/${userClass.id}`
          },
          ...userClass
        };
      });

      if (classId) {
        const userClass = classes?.filter(
          (userClass) => userClass.id === classId
        );

        if (userClass.length > 0) {
          const instructorId = userClass[0].instructor?.id;
          const instructorInfo = await getUser(instructorId);
          const students = await getStudentsInfo(userClass[0]);
          return {
            ...userClass[0],
            students: students,
            instructor: { ...instructorInfo, id: instructorId }
          };
        }
        return [];
      }

      return classes;
    };

    getUserClasses()
      .then((classes) => {
        setUserClasses(classes);
      })
      .catch((err) =>
        console.error(`Failed to get user classes, Error: ${err}`)
      );
  }, [loggedUser]);

  return userClasses;
};
