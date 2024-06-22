import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import "./MyTasks.css";

const MyTasks = () => {
  const { tasks, user } = useContext(TaskContext);
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const todaysTasks = tasks.filter(
    (task) => task.endDate === today && task.userId === user.userId
  );

  return (
    <div className="my-tasks">
      <h2>My tasks</h2>
      <p>{todaysTasks.length} Tasks for Today</p>
      <div className="task-list">
        {todaysTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
