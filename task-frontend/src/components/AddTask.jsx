import { useState } from "react";

/*
onAdd is a prop function passed from the parent component (App.jsx) to handle adding a new task. 
when the user clicks the "Add Task" button, the handleAdd function is called, which checks if the newTask input is not empty, 
then calls onAdd with the new task title and resets the input field.
*/
/*Task Add Flow:
User clicks Add
   ↓
AddTask.jsx (handleAdd)
   ↓
Calls onAdd(newTask)
   ↓
App.jsx (addTask function)
   ↓
fetch POST → backend
   ↓
Backend returns new task
   ↓
setTasks()
   ↓
App re-renders
   ↓
TaskList re-renders
   ↓
TaskItem renders new task
*/
function AddTask({ onAdd }) { 
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (!newTask.trim()) return;
    onAdd(newTask);
    setNewTask("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task..."
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleAdd} style={{ padding: "8px" }}>
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
