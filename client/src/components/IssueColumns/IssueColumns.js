import React from "react";
import IssueColumn from "./IssueColumn/IssueColumn";

const IssueColumns = ({ project }) => (
  <div className="w-11/12 grid grid-cols-3 gap-4 mx-auto">
  {console.log("PROJECT: ", project)}
    <IssueColumn name="To do" projectId={project._id} />
    <IssueColumn name="Doing" projectId={project._id} />
    <IssueColumn name="Done" projectId={project._id} />
  </div>
);

export default IssueColumns;
