import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PencilIcon } from "@heroicons/react/outline";
import { addProject, getProjects, updateProject } from "../../store/actions";
import ProjectForm from "../../components/ProjectForm/ProjectForm";

const Projects = ({ addProject, getProjects, updateProject, projects }) => {
  let [newProjectName, setNewProjectName] = useState("");
  let [creatingProject, setCreatingProject] = useState(false);
  let [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const newInputChangedHandler = (event) => {
    setNewProjectName(event.target.value);
  };

  const newProjectCancelHandler = () => {
    setNewProjectName("");
    setCreatingProject(false);
  };

  const editInputChangedHandler = (event) => {
    setEditingProject({ ...editingProject, name: event.target.value });
  };

  const onAddProjectSubmit = (event) => {
    event.preventDefault();
    addProject({ name: newProjectName });
    setNewProjectName("");
    setCreatingProject(false);
  };

  const onEditProjectSubmit = (event) => {
    event.preventDefault();
    updateProject(editingProject);
    setEditingProject(null);
  };

  const renderProjectName = (project) => (
    <>
      <Link to={`/project/${project._id}`} className="pr-9">
        {project.name}
      </Link>
      <PencilIcon
        onClick={() => setEditingProject(project)}
        className="h-5 w-5 mr-2 cursor-pointer"
      />
    </>
  );

  return (
    <>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg w-9/12 grid grid-cols-2 p-3 mx-auto rounded">
        <div className="text-4xl mb-4">Projects</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-4 col-start-2 justify-self-end self-center cursor-pointer"
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
        {creatingProject ? (
          <ProjectForm
            onSubmit={onAddProjectSubmit}
            value={newProjectName}
            onChange={newInputChangedHandler}
            onCancel={newProjectCancelHandler}
            name="newProjectName"
            placeholder="Enter a project name"
            submitButtonText="Add project"
          />
        ) : null}
        <ul className="col-span-full">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <li key={project._id} className="flex m-1 items-center">
                {/* if we're editing a project name and iterating over that Name */}
                {/* Hence the nester ternary statement */}
                {editingProject ? (
                  editingProject._id === project._id ? (
                    <ProjectForm
                      onSubmit={onEditProjectSubmit}
                      value={editingProject.name}
                      onChange={editInputChangedHandler}
                      onCancel={() => setEditingProject(false)}
                      name="editProjectName"
                      placeholder="Enter a project name"
                      submitButtonText="Update Project"
                    />
                  ) : (
                    // otherwise just render the names
                    renderProjectName(project)
                  )
                ) : (
                  renderProjectName(project)
                )}
              </li>
            ))
          ) : (
            <div className="p-36 text-center">
              No projects avaiable. Click on the the folder above to create a
              project.
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
  };
};

export default connect(mapStateToProps, {
  addProject,
  getProjects,
  updateProject,
})(Projects);
