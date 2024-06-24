import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TaskCalendar.css";
import Tooltip from "@mui/material/Tooltip";

const TaskCalendar = ({ tasks }) => {
  const [date, setDate] = useState(new Date());

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const dayTasks = tasks.filter(
        (task) => new Date(task.endDate).toDateString() === date.toDateString()
      );

      if (dayTasks.length > 0) {
        return (
          <Tooltip
            title={
              <div>
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-tooltip-item ${task.status.toLowerCase()}`}
                  >
                    {task.title} - {task.status}
                  </div>
                ))}
              </div>
            }
            arrow
          >
            <div className="tile-content">
              {dayTasks.map((task) => (
                <span
                  key={task.id}
                  className={`task-indicator ${task.status.toLowerCase()}`}
                ></span>
              ))}
            </div>
          </Tooltip>
        );
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="task-calendar">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={getTileContent}
        />
      </div>
    </div>
  );
};

export default TaskCalendar;
