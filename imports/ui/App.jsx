import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Task from "./task";
import taskCollection from "../../database/collections/taskCollection";
import TaskForm from "./taskForm";
import Login from "./login";

const deleteTask = ({ _id }) => Meteor.call("removeTask", _id);

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("updateTask", _id, !isChecked);
};

export const App = () => {
  const [hideCopmleted, setHideCopmleted] = useState(false);
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  const hideCompletedFilter = {
    isChecked: {
      $ne: true,
    },
  };
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noData = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user) {
      return noData;
    }

    const handler = Meteor.subscribe("tasks");

    if (!handler.ready) {
      return { ...noData, isLoading: true };
    }

    const tasks = taskCollection
      .find(hideCopmleted ? hideCompletedFilter : userFilter, {
        sort: { createdAt: -1 },
      })
      .fetch();
    const pendingTasksCount = useTracker(() =>
      taskCollection.find(hideCompletedFilter).count()
    );

    return { tasks, pendingTasksCount };
  });

  const logout = () => {
    Meteor.logout((err) => console.log(err));
  };
  return (
    <>
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>Welcome to Task Tracker</h1>
            </div>
          </div>
        </header>

        <div className="user" onClick={logout}>
          {user?.username} 🚪
        </div>

        <div className="main">
          {user ? (
            <>
              <TaskForm  />
              {pendingTasksCount ? " Pending Tasks : " + pendingTasksCount : ""}
              <button
                className="hide-done"
                onClick={() => setHideCopmleted(!hideCopmleted)}
              >
                {hideCopmleted ? "Show All" : "Hide Completed"}
              </button>
              {
                isLoading && <div className="loading">loading...</div>
              }
              <ul className="tasks">
                {tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <Login />
            </>
          )}
        </div>
      </div>
    </>
  );
};
