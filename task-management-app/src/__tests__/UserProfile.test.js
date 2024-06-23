import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserProfile from "../components/UserProfile";

const user = {
  name: "Test User",
  role: "Owner",
  avatar: "/src/assets/images/owner0.jpg",
};
const setRole = jest.fn();
const handleRoleChange = jest.fn();
const handleRoleSubmit = jest.fn();
const setAdminPassword = jest.fn();

test("renders UserProfile and interacts with role change", async () => {
  render(
    <UserProfile
      user={user}
      role={user.role}
      setRole={setRole}
      adminPassword=""
      setAdminPassword={setAdminPassword}
      handleRoleChange={handleRoleChange}
      handleRoleSubmit={handleRoleSubmit}
      errorMessage=""
    />
  );

  // Check if user info is rendered
  expect(screen.getByText("Test User")).toBeInTheDocument();
  expect(screen.getByText("Role: Owner")).toBeInTheDocument();

  // Interact with role change
  fireEvent.change(screen.getByDisplayValue("Owner"), {
    target: { value: "Admin" },
  });

  // Wait for the Password field to appear
  await waitFor(() => {
    const passwordInput = screen.queryByPlaceholderText("Password");

    expect(passwordInput).toBeInTheDocument();
  });

  // Interact with the Password field
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "AdminPass1234&" },
  });

  // Click on Change Role button
  fireEvent.click(screen.getByText("Change Role"));

  // Ensure role change function was called
  expect(handleRoleSubmit).toHaveBeenCalled();
});
