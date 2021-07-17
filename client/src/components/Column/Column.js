import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Issue from "./Issue/Issue";

const Column = ({ column, issues }) => (
  <div className="m-8 border-2">
    <h3 className="p-2">{column.title}</h3>
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-2"
        >
          {issues.map((issue, index) => (
            <Issue key={issue._id} issue={issue} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default Column;
