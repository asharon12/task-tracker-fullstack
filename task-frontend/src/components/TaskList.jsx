/*
“What’s the difference between TaskList and TaskItem?”
TaskList is responsible for rendering a collection of tasks, 
while TaskItem represents a single task and handles its UI and interactions. 
This separation follows the single responsibility principle and keeps components modular and maintainable.
*/

import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return tasks.map(task => (
    
    <TaskItem
      key={task._id}
      task={task}
      onDelete={onDelete}
      onToggle={onToggle}
      onEdit={onEdit}
    />
  ));
}

export default TaskList;
