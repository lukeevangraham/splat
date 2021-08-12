import React, { useState } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Issue from "./Issue/Issue";
import { XIcon } from "@heroicons/react/outline";
import { addIssue } from "../../store/actions/project";

const Column = ({ column, issues, projectId, addIssue, editing }) => {
  let [inputtingNewIssue, setInputtingNewIssue] = useState(false);
  let [newIssueSummary, setNewIssueSummary] = useState("");

  const inputChangedHandler = (event) => {
    setNewIssueSummary(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addIssue({
      summary: newIssueSummary,
      projectId: projectId,
    }, column.id);
    setNewIssueSummary("");
    setInputtingNewIssue(false);
  };

  return (
    <div className="m-2 border-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
      <div className="pt-2 px-3 pb-1 text-xl font-medium">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="px-2"
          >
            {issues.map((issue, index) => (
              <Issue key={issue._id} issue={issue} index={index} editing={editing} />
            ))}
            {provided.placeholder}
            {inputtingNewIssue ? (
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  name="newIssueSummary"
                  id="newIssueSummary"
                  placeholder="Enter a summary for this issue"
                  autoFocus
                  value={newIssueSummary}
                  onChange={(event) => inputChangedHandler(event)}
                  className="p-1.5 w-full"
                />
                <div className="flex items-center mt-1">
                  <button className="bg-blue-500 py-1 px-4 rounded text-gray-100">Add issue</button>
                  <button className="text-gray-600 ml-3 hover:text-gray-900 py-1"><XIcon className="h-5 w-5" /></button>
                </div>
              </form>
            ) : (
              <div className="my-3 mx-1.5 text-gray-600 cursor-pointer" onClick={() => setInputtingNewIssue(true)}>
                + Add an issue
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default connect(null, { addIssue })(Column);
