import React, { useState } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Issue from "./Issue/Issue";
import { addIssue } from "../../store/actions/project";

const Column = ({ column, issues, projectId, addIssue }) => {
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
    <div className="m-8 border-2">
      <h3 className="p-2">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2"
          >
            {console.log("ISSUE: ", issues)}
            {issues.map((issue, index) => (
              <Issue key={issue._id} issue={issue} index={index} />
            ))}
            {provided.placeholder}
            {inputtingNewIssue ? (
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  name="newIssueSummary"
                  id="newIssueSummary"
                  value={newIssueSummary}
                  onChange={(event) => inputChangedHandler(event)}
                />
                <div>
                  <button>Add issue</button>
                  <button>X</button>
                </div>
              </form>
            ) : (
              <div onClick={() => setInputtingNewIssue(true)}>
                Add another issue
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default connect(null, { addIssue })(Column);
