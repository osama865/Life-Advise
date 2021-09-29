import React, { useState } from "react";
import taskCollection from "../../database/collections/taskCollection";

export default Info = ({task , onCheckboxClick , onDeleteClick}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={ () => onDeleteClick(task) }>&times;</button>
    </li>
  );
};
