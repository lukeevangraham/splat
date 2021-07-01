import React, { useState } from "react";
import { connect } from "react-redux";
import { addIssue } from "../../../store/actions/project";

const IssueColumn = ({ name, addIssue, project, issues }) => {
  let [inputtingNewIssue, setInputtingNewIssue] = useState(false);
  let [newIssueSummary, setNewIssueSummary] = useState("");

  const inputChangedHandler = (event) => {
    setNewIssueSummary(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addIssue({
      summary: newIssueSummary,
      status: name,
      projectId: project._id,
    });
    setNewIssueSummary("");
    setInputtingNewIssue(false);
  };

  return (
    <div className="bg-gray-200 p-3">
      <div className="text-lg font-semibold">{name}</div>
      <ul>
        {issues
          ? issues.map((issue) =>
              issue.status === name ? (
                <li key={issue._id}>{issue.summary}</li>
              ) : null
            )
          : null}
      </ul>
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
        <div onClick={() => setInputtingNewIssue(true)}>Add another issue</div>
      )}
    </div>
  );
};

export default connect(null, { addIssue })(IssueColumn);
