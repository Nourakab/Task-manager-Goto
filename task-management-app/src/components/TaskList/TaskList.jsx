import React, { useState, useEffect } from "react";
import { GrInProgress } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./TaskList.css";

const TaskList = ({
  tasks,
  onEditClick,
  onDeleteClick,
  onMarkAsCompleted,
  onSaveEdit,
  editingTaskId,
}) => {
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    endDate: "",
  });

  const handleEditClick = (task) => {
    setEditedTask({
      title: task.title,
      description: task.description,
      endDate: task.endDate,
    });
    onEditClick(task);
  };

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = tasks.find((task) => task.id === editingTaskId);
      if (taskToEdit) {
        setEditedTask(taskToEdit);
      }
    }
  }, [editingTaskId, tasks]);

  const handleSaveClick = (taskId) => {
    onSaveEdit(taskId, editedTask);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-card ${task.status.toLowerCase()} ${
            task.status === "Overdue" ? "overdue" : ""
          }`}
        >
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              ></textarea>
              <input
                type="date"
                value={editedTask.endDate}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, endDate: e.target.value })
                }
              />
              <button onClick={() => handleSaveClick(task.id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>End Date: {task.endDate}</p>
              <p className={`status ${task.status.toLowerCase()}`}>
                Status:{" "}
                {task.status === "Pending" ? (
                  <GrInProgress className="status-icon" />
                ) : task.status === "Completed" ? (
                  <IoIosCheckmarkCircle className="status-icon" />
                ) : (
                  <span className="status-overdue">Overdue</span>
                )}
              </p>
              <div className="task-footer">
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => onDeleteClick(task.id)}>Delete</button>
                {task.status !== "Completed" && (
                  <button onClick={() => onMarkAsCompleted(task)}>
                    <IoIosCheckmarkCircle /> Mark as Completed
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
