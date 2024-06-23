import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import "./TaskForm.css";

const TaskForm = ({ onSubmit, initialTask = {} }) => {
  const { user } = useContext(TaskContext);
  const [title, setTitle] = useState(initialTask.title || "");
  const [description, setDescription] = useState(initialTask.description || "");
  const [endDate, setEndDate] = useState(initialTask.endDate || "");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setEndDate(initialTask.endDate || "");
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...initialTask,
      title,
      description,
      endDate,
      userId: user.userId,
      status: initialTask.status || "Pending", // Preserve status for editing
    });
    setTitle("");
    setDescription("");
    setEndDate("");
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h1>{initialTask.id ? "Edit Task" : "Create Task"}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>
      <div className="date-picker-wrapper">
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={today} // Set the minimum date to today to prevent user from selecting a past date
          required
        />
      </div>
      <button type="submit">{initialTask.id ? "Save Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
