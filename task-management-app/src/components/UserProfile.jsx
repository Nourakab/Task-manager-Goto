import React from "react";
import { Box, Avatar } from "@mui/material";

const UserProfile = ({
  user,
  role,
  setRole,
  adminPassword,
  setAdminPassword,
  handleRoleChange,
  handleRoleSubmit,
  errorMessage,
}) => {
  return (
    <div className="right-section">
      <Box
        padding={4}
        borderRadius={2}
        bgcolor="#f5f5f5"
        className="avatar-container"
      >
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <div>{user.name}</div>
        <div>Role: {user.role}</div>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={4}
      >
        <select
          size="small"
          value={role}
          onChange={handleRoleChange}
          className="role-dropdown"
          style={{ width: "200px", marginTop: "1rem" }} // Update to use style prop
        >
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
        </select>
        {role === "Admin" && (
          <input
            type="password"
            size="small"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Password"
            style={{ width: "200px", marginTop: "1rem" }} // Update to use style prop
          />
        )}
        <button
          onClick={handleRoleSubmit}
          style={{ marginTop: "2rem" }} // Update to use style prop
        >
          Change Role
        </button>
        {errorMessage && (
          <div style={{ marginTop: "1rem" }}>{errorMessage}</div>
        )}
      </Box>
    </div>
  );
};

export default UserProfile;