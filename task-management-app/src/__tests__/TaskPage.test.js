import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskPage from "../pages/TaskPage";
import { TaskContext } from "../context/TaskContext";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    endDate: "2024-07-01",
    status: "Pending",
    userId: 1,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    endDate: "2024-07-01",
    status: "Pending",
    userId: 1,
  },
];

const user = { userId: 1, name: "Test User", role: "Owner" };
const addTask = jest.fn();
const deleteTask = jest.fn();
const editTask = jest.fn();
const setUser = jest.fn();
const users = [user];

test("renders TaskPage and interacts with tasks", () => {
  render(
    <TaskContext.Provider
      value={{ tasks, user, addTask, deleteTask, editTask, setUser, users }}
    >
      <TaskPage />
    </TaskContext.Provider>
  );

  // Check if tasks are rendered
  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();

  // Interact with add task button
  fireEvent.click(screen.getByText("+"));

  // Add more interactions as needed
});
