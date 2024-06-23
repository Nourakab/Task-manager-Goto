import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const initialTasks = [
    // Hardcoded tasks for owners
    {
      id: 1,
      title: "Write essay",
      description: "Write an essay of 1000 words in French.",
      endDate: "2024-07-01",
      status: "Pending",
      userId: 1,
    },
    {
      id: 2,
      title: "Implement new feature for user authentication.",
      description: "Use OAuth and FB SDK",
      endDate: "2024-07-02",
      status: "Pending", // Set this to pending initially
      userId: 2,
    },
    {
      id: 3,
      title: "Fix bugs",
      description: "Fix bug in payment processing module.",
      endDate: "2024-07-03",
      status: "Pending",
      userId: 3,
    },
    {
      id: 4,
      title: "Code review",
      description: "Merge pull requests on GIT.",
      endDate: "2024-06-03",
      status: "Pending",
      userId: 2,
    },
    {
      id: 5,
      title: "Check database",
      description: "Optimize database queries for performance.",
      endDate: "2024-05-05",
      status: "Pending",
      userId: 3,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [user, setUser] = useState(null); // Initially, no user is logged in

  const users = [
    {
      userId: 0,
      name: import.meta.env.VITE_USER_0_NAME,
      role: import.meta.env.VITE_USER_0_ROLE,
      email: import.meta.env.VITE_USER_0_EMAIL,
      password: import.meta.env.VITE_USER_0_PASSWORD,
      avatar: import.meta.env.VITE_USER_0_AVATAR,
    },
    {
      userId: 1,
      name: import.meta.env.VITE_USER_1_NAME,
      role: import.meta.env.VITE_USER_1_ROLE,
      email: import.meta.env.VITE_USER_1_EMAIL,
      password: import.meta.env.VITE_USER_1_PASSWORD,
      avatar: import.meta.env.VITE_USER_1_AVATAR,
    },
    {
      userId: 2,
      name: import.meta.env.VITE_USER_2_NAME,
      role: import.meta.env.VITE_USER_2_ROLE,
      email: import.meta.env.VITE_USER_2_EMAIL,
      password: import.meta.env.VITE_USER_2_PASSWORD,
      avatar: import.meta.env.VITE_USER_2_AVATAR,
    },
    {
      userId: 3,
      name: import.meta.env.VITE_USER_3_NAME,
      role: import.meta.env.VITE_USER_3_ROLE,
      email: import.meta.env.VITE_USER_3_EMAIL,
      password: import.meta.env.VITE_USER_3_PASSWORD,
      avatar: import.meta.env.VITE_USER_3_AVATAR,
    },
    {
      userId: 4,
      name: import.meta.env.VITE_USER_4_NAME,
      role: import.meta.env.VITE_USER_4_ROLE,
      email: import.meta.env.VITE_USER_4_EMAIL,
      password: import.meta.env.VITE_USER_4_PASSWORD,
      avatar: import.meta.env.VITE_USER_4_AVATAR,
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

  //Check for overdue tasks
  const updateTaskStatus = (tasks) => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.map((task) => {
      if (task.status === "Pending" && task.endDate < today) {
        return { ...task, status: "Overdue" };
      }
      return task;
    });
  };

  const canManageTask = (task) => {
    if (user.role === "Admin") return true;
    if (user.role === "Owner" && task.userId === user.userId) return true;
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setTasks((prevTasks) => updateTaskStatus(prevTasks));
  }, []);

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
