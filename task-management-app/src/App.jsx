import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { TaskContext } from "./context/TaskContext";
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  const { user } = useContext(TaskContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/tasks" /> : <Login />} />
        <Route
          path="/tasks"
          element={user ? <TaskPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
