import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "./TaskPage.css";

const TaskPage = () => {
  const statuses = ["Draft", "In Progress", "Editing", "Done"];
  const { tasks } = useContext(TaskContext);

  return (
    <div className="task-page container">
      <header className="task-header">
        <h1>Task Management</h1>
      </header>
      <TaskForm />
      <div className="task-columns flex">
        {statuses.map((status) => (
          <div key={status} className="task-column flex-col">
            <h2>{status}</h2>
            <TaskList tasks={tasks.filter((task) => task.status === status)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
