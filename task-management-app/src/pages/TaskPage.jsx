import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import MyTasks from "../components/MyTasks";
import "./TaskPage.css";

const TaskPage = () => {
  const { tasks, user } = useContext(TaskContext);
  const statuses = ["Draft", "In Progress", "Editing", "Done"];

  return (
    <div className="task-page container">
      <header className="task-header">
        <h1>Task Management</h1>
      </header>
      <p className="user-role">Role: {user.role}</p>
      <MyTasks />
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
