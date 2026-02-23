/*
| State            | Location | Type   | Why                              |
| ---------------- | -------- | ------ | -------------------------------- |
| tasks            | App      | Shared | Multiple components depend on it |
| newTask          | AddTask  | Local  | Only input field needs it        |
| isEditing        | TaskItem | Local  | Only that row UI needs it        |
| editedTitle      | TaskItem | Local  | Temporary editing state          |
| filter (if used) | App      | Shared | Affects list rendering           |
*/

import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Add task
  const addTask = (title) => {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prev) => [...prev, newTask]);
      });
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
    });
  };

  // Toggle complete
  const toggleComplete = (id, currentStatus) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentStatus }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? updatedTask : task
          )
        );
      });
  };

  // Edit task
  const editTask = (id, newTitle) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? updatedTask : task
          )
        );
      });
  };

  return (
    <div className="app-container">
      <h1>Task Tracker</h1>
      <AddTask onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
