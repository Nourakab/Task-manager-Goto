import React, { useContext, useState, useRef, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import UserProfile from "../components/UserProfile";
import noTaskImage from "../assets/images/noTask.jpg";
import "./TaskPage.css";

const TaskPage = () => {
  const { tasks, user, addTask, deleteTask, editTask, setUser, users } =
    useContext(TaskContext);
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [initialTask, setInitialTask] = useState({});
  const [role, setRole] = useState(user.role);
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortCriteria === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "endDate") {
      return new Date(a.endDate) - new Date(b.endDate);
    } else if (sortCriteria === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const userTasks = sortedTasks.filter(
    (task) =>
      (user.role === "Admin" || task.userId === user.userId) &&
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSaveEdit = (taskId, editedTask) => {
    editTask({ ...editedTask, id: taskId });
    setEditingTaskId(null);
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

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "Admin") {
      setAdminPassword("");
      setErrorMessage("");
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
    <div className="task-page">
      <div className="left-section">
        <header className="task-header">
          <h1>Task Management</h1>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <SortDropdown
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
          />
        </header>
        <div className="task-content">
          {userTasks.length === 0 ? (
            <div className="no-tasks" ref={formRef}>
              <img src={noTaskImage} alt="No tasks" />
              <div>There are no tasks</div>
              <div>Select to create a new task</div>
              <button onClick={handleAddTaskClick} className="add-task-button">
                +
              </button>
            </div>
          ) : (
            <div className="task-list">
              {userTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  handleMarkAsCompleted={handleMarkAsCompleted}
                  handleSaveEdit={handleSaveEdit} // Pass handleSaveEdit to TaskCard
                />
              ))}
              <button onClick={handleAddTaskClick} className="add-task-button">
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <UserProfile
        user={user}
        role={role}
        setRole={setRole}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        handleRoleChange={handleRoleChange}
        handleRoleSubmit={handleRoleSubmit}
        errorMessage={errorMessage}
        tasks={tasks}
      />
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
