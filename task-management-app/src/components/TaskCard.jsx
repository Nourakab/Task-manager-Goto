import React, { useState } from "react";

const TaskCard = ({
  task,
  handleEditClick,
  handleDeleteClick,
  handleMarkAsCompleted,
  handleSaveEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const onSaveEdit = () => {
    const today = new Date().toISOString().split("T")[0];
    const updatedTask = {
      ...editedTask,
      status: editedTask.endDate < today ? "Overdue" : editedTask.status,
    };
    handleSaveEdit(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            placeholder="Description"
            required
          />
          <input
            type="date"
            value={editedTask.endDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, endDate: e.target.value })
            }
            required
          />
          <button onClick={onSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div className="task-card-content">
            <h2>{task.title}</h2>
            <div>{task.description}</div>
            <div>End Date: {task.endDate}</div>
            <div>
              Status:{" "}
              {task.status === "Pending" ? (
                "⏳"
              ) : task.status === "Overdue" ? (
                <span style={{ color: "red" }}>Overdue❗</span>
              ) : (
                "✔️"
              )}
            </div>
          </div>
          <div className="task-footer">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
            {task.status === "Pending" && (
              <button onClick={() => handleMarkAsCompleted(task)}>
                Mark as Completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
