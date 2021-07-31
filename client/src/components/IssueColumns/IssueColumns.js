import React from "react";
import IssueColumn from "./IssueColumn/IssueColumn";

const IssueColumns = ({ project }) => (
  <div className="w-11/12 grid grid-cols-3 gap-4 mx-auto">
    <IssueColumn
      name="To do"
      project={project}
      issues={project.issues.filter((issue) => issue.status === "To do")}
    />
    <IssueColumn name="Doing" project={project} issues={project.issues.filter((issue) => issue.status === "Doing")} />
    <IssueColumn name="Done" project={project} issues={project.issues.filter((issue) => issue.status === "Done")} />
  </div>
);

export default IssueColumns;
