/*
component: a reusable piece of UI that can be used in different parts of the application. it can be a function or a class that returns JSX (a syntax extension for JavaScript that looks like HTML). components can have props (properties) to pass data and state to manage internal data.
hooks: functions that let you use state and other React features in functional components. they allow you to "hook into" React's lifecycle and state management without writing a class component.
dom: Document Object Model - a programming interface for web documents. it represents the page so that programs can change the document structure, style, and content. when you manipulate the DOM, you are changing the structure or content of the webpage.
useState - to manage state in functional components - manages data. each time useState changes, it triggers a re-render of the component to reflect the new state.
useEffect - to perform side effects (fetching data, updating DOM, etc.)
*/

/*
Ask 3 questions:

1️⃣ Does it change over time?
2️⃣ Does it affect what gets rendered?
3️⃣ Is it already calculable from other state?

If yes to 1 & 2 → likely state
If yes to 3 → derived, not state
If no → not state
*/


/*
over all structure of the app:
1. App component - main component that holds the state and logic for the task tracker.
2. State management - useState to manage tasks, new task input, and filter state.
3. useEffect to fetch tasks from the backend on initial load.
4. Functions to handle adding, deleting, and toggling tasks.
5. Filter logic to display tasks based on selected filter (all, completed, pending).
6. JSX to render the UI - input for new task, buttons for filters, and list of tasks with actions.
*/

import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); //old tasks. [] initial state is empty array. tasks is the current state value, setTasks is the function to update it. when we call setTasks, React will re-render the component with the new tasks value.
  const [newTask, setNewTask] = useState(""); //new task input(post)
  const [filter, setFilter] = useState("all"); //filter state to manage which tasks to show (all, completed, pending)

  // Fetch tasks on initial load
  //useeffect: 1. fetch the host 3000/tasks 2. convert response to json 3. set tasks state with the data 4. catch any errors
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []); //[] - empty dependency array means this effect runs only once when the component mounts

  // Add new task
/* Steps to add a new task:
1. Check if newTask is not empty (after trimming whitespace). if it is empty, return early and do not proceed with the fetch request.
2. Make a POST request to the backend at http://localhost:3000/tasks with the new task title in the request body.
3. Convert the response to JSON
4. update the tasks state by adding the new task to the existing list of tasks.
5. Reset the newTask input field to an empty string after successfully adding the task.
6. Catch and log any errors that occur during the fetch request.
*/
  const addTask = () => {
    if (!newTask.trim()) return; //prevent adding empty tasks. trim() removes whitespace from both ends of the string. if the trimmed newTask is empty, we return early and do not proceed with the fetch request.

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newTask })
    })
      .then(res => res.json())
      .then(data => {
        setTasks(prevTasks => [...prevTasks, data]); //...prevTasks (spread operator - creates a new immutable array) to keep old tasks and add new one
        setNewTask(""); //reset newTask input field
      })
      .catch(err => console.error("Error adding task:", err));
  };

  // Delete task
/* Steps to delete a task:
1. Make a DELETE request to the backend at http://localhost:3000/tasks/:id where :id is the id of the task to be deleted.
2. update the tasks state by filtering out the deleted task from the current list of tasks.
3. Catch and log any errors that occur during the fetch request.
*/
  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setTasks(prevTasks =>
          prevTasks.filter(task => task.id !== id) //remove deleted task from state
        );
      })
      .catch(err => console.error("Error deleting task:", err));
  };

  // Toggle complete / undo
/* Steps to toggle task completion:
1. Make a PUT request to the backend at http://localhost:3000/tasks/:id where :id is the id of the task to be toggled.
2. Convert the response to JSON to get the updated task.
3. update the tasks state by mapping through the current list of tasks and replacing the toggled task with the updated task from the response.
4. Catch and log any errors that occur during the fetch request.
*/
  const toggleComplete = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === id ? updatedTask : task //if task id matches updated task id, replace it with updated task, otherwise keep the same task
          )
        );
      })
      .catch(err => console.error("Error updating task:", err));
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all"
  });

  //count completed and pending tasks for summary display
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Task Tracker</h1>

      {/* Add Task Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={addTask} style={{ padding: "8px" }}>
          Add Task
        </button>
      </div>
      {/* Task Summary: count*/}
      <p>
      Completed: {completedCount} | Pending: {pendingCount}
      </p>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ marginLeft: "10px" }}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{ marginLeft: "10px" }}
        >
          Pending
        </button>
      </div>

      <hr />

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map(task => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}
          >
            <span>
              {task.title} —{" "}
              {task.completed ? "✅ Completed" : "❌ Not Done"}
            </span>

            <div>
              <button
                onClick={() => toggleComplete(task.id)}
                style={{ marginRight: "10px" }}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;