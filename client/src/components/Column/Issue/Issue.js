import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Issue = ({ issue, index }) => (
  <Draggable draggableId={issue._id} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isdragging={snapshot.isDragging.toString()}
      >
        {issue.summary}
      </div>
    )}
  </Draggable>
);

export default Issue;
