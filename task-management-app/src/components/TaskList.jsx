import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, deleteTask, editTask } = useContext(TaskContext);

  const handleEditClick = (task) => {
    // Implement the logic to handle edit click, e.g., show edit form
  };

  const handleDeleteClick = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEditClick={() => handleEditClick(task)}
          onDeleteClick={() => handleDeleteClick(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
