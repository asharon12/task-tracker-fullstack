/*Task Delete Flow:
TaskItem (button click)
   ↓
onDelete(task.id)
   ↓
App.deleteTask(id)
   ↓
Backend DELETE
   ↓
setTasks()
   ↓
App re-renders
   ↓
TaskList re-renders
   ↓
UI updates (item removed)
*/

/*Task Toggle Flow:
TaskItem (button click)
   ↓
onToggle(task.id)
   ↓
App.toggleComplete(id)
   ↓
Backend PUT (toggle)
   ↓
setTasks(map update)
   ↓
App re-renders
   ↓
TaskList re-renders
   ↓
Only that TaskItem updates
*/

import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (!editedTitle.trim()) return;
    onEdit(task._id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>
            {task.title} —{" "}
            {task.completed ? "✅ Completed" : "❌ Not Done"}
          </span>

          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button
              onClick={() =>
                onToggle(task._id, task.completed)
              }
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
