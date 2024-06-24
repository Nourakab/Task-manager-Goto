import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Calendar from "react-calendar";
import "./UserProfile.css";
import TaskCalendar from "./TaskCalendar";

const UserProfile = ({
  user,
  role,
  setRole,
  adminPassword,
  setAdminPassword,
  handleRoleChange,
  handleRoleSubmit,
  errorMessage,
  tasks,
}) => {
  const [selectedRole, setSelectedRole] = useState(role);

  const onRoleChange = (e) => {
    setSelectedRole(e.target.value);
    handleRoleChange(e);
  };

  return (
    <div className="right-section">
      <div className="avatar-container">
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <h2>{user.name}</h2>
        <div>Role: {user.role}</div>
      </div>
      <div className="role-change">
        <select
          size="small"
          value={selectedRole}
          onChange={onRoleChange}
          className="role-dropdown"
        >
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
        </select>
        {selectedRole === "Admin" && (
          <input
            type="password"
            size="small"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Password"
            className="admin-password-input"
          />
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button onClick={handleRoleSubmit}>Change Role</button>
      </div>
      <div className="calendar-section">
        <TaskCalendar tasks={tasks} />
      </div>
    </div>
  );
};

export default UserProfile;
