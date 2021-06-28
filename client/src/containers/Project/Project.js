import { connect } from "react-redux";
import React, { useEffect } from "react";
import { fetchProject } from "../../store/actions/project";

const Project = ({ match, fetchProject, currentProject }) => {
  useEffect(() => {
    fetchProject(match.params.id);
  }, [fetchProject]);

  return (
    <div>
      <div>{currentProject.name}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentProject: state.project.currentProject,
  };
};

export default connect(mapStateToProps, { fetchProject })(Project);
