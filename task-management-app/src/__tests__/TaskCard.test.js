import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

const task = {
  id: 1,
  title: "Test Task",
  description: "This is a test task",
  endDate: "2024-06-30",
  status: "Pending",
};

test("renders TaskCard component", () => {
  render(
    <TaskCard
      task={task}
      handleEditClick={() => {}}
      handleDeleteClick={() => {}}
      handleMarkAsCompleted={() => {}}
      handleSaveEdit={() => {}}
    />
  );

  // Get all elements with the text "Test Task"
  const titleElements = screen.getAllByText(/Test Task/i);
  // Assert that there is at least one element with the text "Test Task"
  expect(titleElements.length).toBeGreaterThan(0);

  // Assert other elements
  expect(screen.getByText(/This is a test task/i)).toBeInTheDocument();
  expect(screen.getByText(/End Date: 2024-06-30/i)).toBeInTheDocument();
  expect(screen.getByText(/⏳/i)).toBeInTheDocument();
});

test("edit button works", () => {
  render(
    <TaskCard
      task={task}
      handleEditClick={() => {}}
      handleDeleteClick={() => {}}
      handleMarkAsCompleted={() => {}}
      handleSaveEdit={() => {}}
    />
  );

  fireEvent.click(screen.getByText(/Edit/i));

  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();

  // Check for the date input element
  const dateInput = screen.getByDisplayValue("2024-06-30");
  expect(dateInput).toBeInTheDocument();
});
