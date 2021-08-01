import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Issue = ({ issue, index }) => (
  <Draggable draggableId={issue._id} index={index}>
    {(provided) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="border-solid border-2 p-2 my-1.5 rounded bg-white"
      >
        {issue.summary}
      </div>
    )}
  </Draggable>
);

export default Issue;
