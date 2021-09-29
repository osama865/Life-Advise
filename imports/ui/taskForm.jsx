import React, { useState } from "react";
import taskCollection from "../../database/collections/taskCollection";

export default function TaskForm() {
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    Meteor.call('insertTask' , task)
    setTask("");
    
  };
  return (
    <div>
      <form action="" className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type to add new tasks"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
