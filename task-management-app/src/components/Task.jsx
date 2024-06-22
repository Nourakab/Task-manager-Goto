import React, { useState, useContext } from "react";

const Task = ({ task }) => {
  const { deleteTask, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false); //A boolean state to toggle between view and edit mode.
  const [editedTask, setEditedTask] = useState({
    //editedTask is object to hold the current values of the task being edited.
    title: task.title,
    description: task.description,
    endDate: task.endDate,
    status: task.status,
  });

  const handleEditClick = () => {
    setIsEditing(true); //set it to true to switch to edit mode
  };

  //Updates the editedTask state with the new values as the user types.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    editTask({ ...task, ...editedTask }); //calls it from the context to update the task
    setIsEditing(false); //then switches it to false
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? ( //conditional rendering
        //If isEditing is true, render the form to edit the task
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="date"
            name="endDate"
            value={editedTask.endDate}
            onChange={handleInputChange}
            required
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      ) : (
        //If isEditing is false, render the task details and buttons to edit or delete
        //The use of fragment to group multiple elements without adding an extra node to the DOM
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>End Date: {task.endDate}</p>
          <p>Status: {task.status}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
