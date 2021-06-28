import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addProject, getProjects } from "../../store/actions";

const Projects = ({ addProject, getProjects, projects }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  let [newProjectName, setNewProjectName] = useState("");
  let [creatingProject, setCreatingProject] = useState(false);

  const inputChangedHandler = (event) => {
    setNewProjectName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addProject({ name: newProjectName });
    setNewProjectName("")
    setCreatingProject(false)
  };

  let createProject = (
    <form onSubmit={onSubmit} className="col-span-full">
      <input
        type="text"
        name="newProjectName"
        id="newProjectName"
        value={newProjectName}
        onChange={(event) => inputChangedHandler(event)}
      />
      <button>Add Project</button>
    </form>
  );

  return (
    <div className="bg-red-400 w-9/12 grid grid-cols-2 p-3">
      <div className="text-4xl">Projects</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 col-start-2 justify-self-end self-center"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setCreatingProject(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      {creatingProject ? createProject : null}
      <ul>
        {console.log("projects: ", projects)}
        {projects.length > 0
          ? projects.map((project, index) => (
              <li key={index}>{project.name}</li>
            ))
          : null}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
  };
};

export default connect(mapStateToProps, { addProject, getProjects })(Projects);
