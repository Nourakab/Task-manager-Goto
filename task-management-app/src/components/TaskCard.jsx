import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "./TaskCard.css";

const TaskCard = ({ task, onEditClick, onDeleteClick }) => {
  const { deleteTask, canManageTask } = useContext(TaskContext);

  const handleDeleteClick = () => {
    if (canManageTask(task)) {
      deleteTask(task.id);
    } else {
      alert("You don't have permission to delete this task.");
    }
  };

  return (
    <div className={`task-card ${task.status.toLowerCase()}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>End Date: {task.endDate}</p>
      <p>Status: {task.status}</p>
      <div
        className="progress-bar"
        style={{ width: `${task.progress}%` }}
      ></div>
      {canManageTask(task) && (
        <div className="task-footer">
          <button onClick={onEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
