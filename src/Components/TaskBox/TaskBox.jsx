import React, { useState } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { ProgressStep } from "carbon-components-react";
import { TaskStatus } from "../../Views/ProjectPage/TasksPage";

const TaskBox = ({ task }) => {
  const [hovered, setHovered] = useState(false);

  if (!task) {
    return null;
  }

  return (
    <div
      style={styles.taskBox(hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.taskBoxCol}>
        <p style={styles.taskBoxTaskNumber}>{`#${task.taskNumber}`}</p>
        <p style={styles.taskBoxTaskName}>{task.taskName}</p>
        <p style={styles.taskBoxTaskUser}>{task.username}</p>
      </div>
      <div style={styles.taskBoxCol}>
        <div style={styles.taskBoxStatusContainer}>
          <ProgressStep
            disabled={
              task.status?.toLowerCase() === TaskStatus.New.toLowerCase()
            }
            current={
              task.status.toLowerCase() === TaskStatus.Active.toLowerCase()
            }
            complete={
              task.status.toLowerCase() === TaskStatus.Closed.toLowerCase()
            }
            label={task.status}
          />
        </div>
        <p style={styles.taskBoxTaskDate}>{task.date}</p>
      </div>
    </div>
  );
};

TaskBox.propTypes = {
  task: PropTypes.object
};

export default TaskBox;
