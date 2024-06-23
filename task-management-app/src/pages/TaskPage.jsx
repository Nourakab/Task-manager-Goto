import React, { useContext, useState, useRef, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import "./TaskPage.css";
import noTaskImage from "../assets/images/noTask.jpg";

const TaskPage = () => {
  const { tasks, user, addTask, deleteTask, editTask } =
    useContext(TaskContext);
  const userTasks = tasks.filter(
    (task) => user.role === "Admin" || task.userId === user.userId
  );
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const formRef = useRef(null);

  const handleAddTaskClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleFormSubmit = (task) => {
    if (editingTask) {
      editTask(task);
      setEditingTask(null);
    } else {
      addTask(task);
    }
    setShowForm(false);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteClick = (taskId) => {
    deleteTask(taskId);
  };

  const handleMarkAsCompleted = (task) => {
    editTask({ ...task, status: "Completed" });
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  return (
    <div className="task-page container">
      <header className="task-header">
        <h1>Task Management</h1>
      </header>
      <p className="user-role">Role: {user.role}</p>
      {userTasks.length === 0 ? (
        <div className="no-tasks" ref={formRef}>
          <img src={noTaskImage} alt="No tasks" />
          <h2>There are no tasks</h2>
          <p>Select to create a new task</p>
          <button className="add-task-button" onClick={handleAddTaskClick}>
            +
          </button>
        </div>
      ) : (
        <>
          <TaskList
            tasks={userTasks}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onMarkAsCompleted={handleMarkAsCompleted}
            onSaveEdit={handleFormSubmit}
          />
          <button className="add-task-button" onClick={handleAddTaskClick}>
            +
          </button>
        </>
      )}
      {showForm && (
        <Modal show={showForm} onClose={() => setShowForm(false)}>
          <div ref={formRef}>
            <TaskForm
              onSubmit={handleFormSubmit}
              initialTask={editingTask || {}}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskPage;
