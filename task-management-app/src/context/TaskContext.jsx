//Defines the context and provides functions to manage the task state.
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    // Hardcoded tasks for owners
    {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      endDate: "2024-07-01",
      status: "Pending",
      userId: 1,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for Task 2",
      endDate: "2024-07-02",
      status: "Completed",
      userId: 2,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description for Task 3",
      endDate: "2024-07-03",
      status: "Pending",
      userId: 3,
    },
  ]);
  const [user, setUser] = useState(null); // Initially, no user is logged in

  const users = [
    {
      userId: 1,
      name: "Owner 1",
      role: "Owner",
      email: "owner1@example.com",
      password: "OwnerPass1!",
    },
    {
      userId: 2,
      name: "Owner 2",
      role: "Owner",
      email: "owner2@example.com",
      password: "OwnerPass2!",
    },
    {
      userId: 3,
      name: "Owner 3",
      role: "Owner",
      email: "owner3@example.com",
      password: "OwnerPass3!",
    },
    {
      userId: 4,
      name: "Admin User",
      role: "Admin",
      email: "admin@example.com",
      password: "AdminPass1234&",
    },
  ];

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), userId: user.userId }; // Assign a unique ID for each task
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const canManageTask = (task) => {
    if (user.role === "Admin") return true;
    if (user.role === "Owner" && task.userId === user.userId) return true;
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        canManageTask,
        user,
        setUser,
        logout,
        users,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
