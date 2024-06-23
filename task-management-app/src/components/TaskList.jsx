import React, { useState } from "react";
import { GrInProgress } from "react-icons/gr";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./TaskList.css";

const TaskList = ({
  tasks,
  onEditClick,
  onDeleteClick,
  onMarkAsCompleted,
  onSaveEdit,
}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    endDate: "",
  });

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description,
      endDate: task.endDate,
    });
  };

  const handleSaveClick = (taskId) => {
    onSaveEdit({ ...editedTask, id: taskId });
    setEditingTaskId(null);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
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
              <p>
                Status:{" "}
                {task.status === "Pending" ? (
                  <GrInProgress className="status-icon" />
                ) : (
                  <IoIosCheckmarkCircle className="status-icon" />
                )}
              </p>
              <div className="task-footer">
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => onDeleteClick(task.id)}>Delete</button>
                {task.status === "Pending" && (
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
