import { connect } from "react-redux";
import React, { useEffect } from "react";
import { getProject } from "../../store/actions/project";
import IssueColumns from "../../components/IssueColumns/IssueColumns";

const Project = ({ match, getProject, currentProject }) => {
  useEffect(() => {
    getProject(match.params.id);
  }, [getProject, match.params.id]);

  return (
    <div>
      <div>{currentProject.name}</div>
      <IssueColumns project={currentProject} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentProject: state.project.currentProject,
  };
};

export default connect(mapStateToProps, { getProject })(Project);
