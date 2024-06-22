//Defines the context and provides functions to manage the task state.
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // We start with no user

  const addTask = (task) => {
    setTasks([...tasks, task]);
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
