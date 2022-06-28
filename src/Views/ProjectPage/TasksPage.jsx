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

const TasksPage = ({ setCreateTaskModalVisible, projectData, tasks }) => {
  const getTaskBoard = (taskStatus) => {
    const boardTasks = tasks
      ?.filter((task) => task.status === taskStatus)
      ?.sort((task1, task2) => task2?.taskNumber - task1?.taskNumber);
    return (
      <div style={styles.taskBoard} className={"defaultBoxShadowBlack"}>
        <h3 style={styles.taskBoardTitle}>{taskStatus}</h3>
        {boardTasks?.length > 0 ? (
          boardTasks.map((task, index) => <TaskBox key={index} task={task} />)
        ) : (
          <h5 style={{ margin: "5px 0 0 15px" }}>{"No tasks yet!"}</h5>
        )}
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
  setCreateTaskModalVisible: PropTypes.func,
  projectData: PropTypes.object,
  tasks: PropTypes.array
};

export default TasksPage;
