import React, { useState, useEffect } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { ProgressStep } from "carbon-components-react";
import { TaskStatus } from "../../Views/ProjectPage/TasksPage";
import { getUser } from "../../Utilities/ClassUtils";
import { useNavigate } from "react-router-dom";

const TaskBox = ({ task }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  if (!task) {
    return null;
  }

  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const getUserInfo = async () => await getUser(task.assignedTo?.id);
    getUserInfo()
      .then((user) => setUserInfo(user))
      .catch((err) => console.error("Failed to get user info, Error: " + err));
  }, []);

  return (
    <div
      style={styles.taskBox(hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/task/${task.id}`, { replace: true })}
    >
      <div style={styles.taskBoxCol}>
        <p style={styles.taskBoxTaskNumber}>{task.id}</p>
        <p style={styles.taskBoxTaskName}>{task.name}</p>
        <p style={styles.taskBoxTaskUser}>
          {userInfo.firstName + " " + userInfo.lastName}
        </p>
      </div>
      <div style={styles.taskBoxCol}>
        <div style={styles.taskBoxStatusContainer}>
          <ProgressStep
            disabled={
              task.status?.toLowerCase() === TaskStatus.New.toLowerCase()
            }
            current={
              task.status?.toLowerCase() === TaskStatus.Active.toLowerCase()
            }
            complete={
              task.status?.toLowerCase() === TaskStatus.Closed.toLowerCase()
            }
            label={task.status}
          />
        </div>
        <p style={styles.taskBoxTaskDate}>
          {task.createdOn?.toDate()?.toDateString()}
        </p>
      </div>
    </div>
  );
};

TaskBox.propTypes = {
  task: PropTypes.object
};

export default TaskBox;
