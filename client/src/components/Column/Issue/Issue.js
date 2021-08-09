import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { PencilAltIcon } from "@heroicons/react/outline";

const Issue = ({ issue, index, editing }) => (
  <Draggable draggableId={issue._id} index={index}>
    {(provided) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="border-solid border-1 p-1.5 my-1.5 rounded bg-white flex"
      >
        <div className="flex-grow">{issue.summary}</div>
        <PencilAltIcon className="h-5 w-5" onClick={() => editing(issue)} />
      </div>
    )}
  </Draggable>
);

export default Issue;
