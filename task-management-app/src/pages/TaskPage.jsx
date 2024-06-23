import React, { useContext, useState, useRef, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import "./TaskPage.css";
import noTaskImage from "../assets/images/noTask.jpg";

const TaskPage = () => {
  const { tasks, user, addTask, deleteTask, editTask, users } =
    useContext(TaskContext);
  const userTasks = tasks.filter(
    (task) => user.role === "Admin" || task.userId === user.userId
  );
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [initialTask, setInitialTask] = useState({});
  const [role, setRole] = useState(user.role);
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  const handleAddTaskClick = () => {
    setShowForm(true);
    setInitialTask({});
    setEditingTaskId(null);
  };

  const handleFormSubmit = (task) => {
    if (editingTaskId !== null) {
      editTask({ ...task, id: editingTaskId });
      setEditingTaskId(null);
    } else {
      addTask(task);
    }
    setShowForm(false);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
  };

  const handleDeleteClick = (taskId) => {
    deleteTask(taskId);
  };

  const handleMarkAsCompleted = (task) => {
    editTask({ ...task, status: "Completed" });
  };

  const handleSaveEdit = (taskId, editedTask) => {
    editTask({ ...editedTask, id: taskId });
    setEditingTaskId(null);
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

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "Admin") {
      setAdminPassword(""); // Clear previous password
      setErrorMessage(""); // Clear previous error message
    }
    setRole(selectedRole);
  };

  const handleRoleSubmit = () => {
    if (role === "Admin" && adminPassword !== "AdminPass1234&") {
      setErrorMessage("Incorrect admin password");
      return;
    }

    const selectedUser = users.find((u) => u.role === role);
    if (selectedUser) {
      setUser(selectedUser);
      setRole(selectedUser.role);
      setErrorMessage("");
    } else {
      setErrorMessage("User not found");
    }
  };

  return (
    <div className="task-page container">
      <header className="task-header">
        <h1>Task Management</h1>
      </header>
      <p className="user-role">Role: {user.role}</p>
      <div className="role-selector">
        <label>
          Select Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        {role === "Admin" && (
          <label>
            Admin Password:
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
        )}
        <button onClick={handleRoleSubmit}>Change Role</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
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
            onSaveEdit={handleSaveEdit}
            editingTaskId={editingTaskId}
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
              initialTask={
                editingTaskId !== null
                  ? userTasks.find((task) => task.id === editingTaskId)
                  : {}
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskPage;
