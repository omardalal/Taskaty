import React from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";
import TaskBox from "../../Components/TaskBox/TaskBox";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";

export const TaskStatus = {
  New: "New",
  Active: "Active",
  Closed: "Closed"
};

const TasksPage = ({ setCreateTaskModalVisible }) => {
  const getTaskBoard = (taskStatus) => {
    const task = {
      username: "Omar Dalal",
      taskNumber: 22,
      taskName: "Landing Page FE",
      status: TaskStatus.New,
      date: "12-02-2022"
    };
    const tasks = [];
    for (let i = 0; i < 5; i++) {
      tasks.push(task);
      tasks.push({ ...task, ...{ status: TaskStatus.Active } });
      tasks.push({ ...task, ...{ status: TaskStatus.Closed } });
    }
    return (
      <div style={styles.taskBoard} className={"defaultBoxShadowBlack"}>
        <h3 style={styles.taskBoardTitle}>{taskStatus}</h3>
        {tasks
          .filter((task) => task.status === taskStatus)
          .map((task, index) => (
            <TaskBox key={index} task={task} />
          ))}
      </div>
    );
  };

  return (
    <div style={styles.homeMainContainer}>
      <div style={styles.tasksPageContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Class Groups"}</h1>
          <div style={styles.titleRightBtnContainer}>
            <CustomButton
              blackButton
              text="Create new task"
              onClick={() => setCreateTaskModalVisible(true)}
            />
          </div>
        </div>
        <div style={styles.taskBoardsContainer}>
          {getTaskBoard(TaskStatus.New)}
          {getTaskBoard(TaskStatus.Active)}
          {getTaskBoard(TaskStatus.Closed)}
        </div>
      </div>
    </div>
  );
};

TasksPage.propTypes = {
  setCreateTaskModalVisible: PropTypes.func
};

export default TasksPage;