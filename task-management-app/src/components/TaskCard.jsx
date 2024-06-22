import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onEditClick, onDeleteClick }) => {
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
      <div className="task-footer">
        <button onClick={onEditClick}>Edit</button>
        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
