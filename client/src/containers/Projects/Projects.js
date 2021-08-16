import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import { XIcon, TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { addProject, getProjects, updateProject } from "../../store/actions";

const Projects = ({ addProject, getProjects, updateProject, projects }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  let [newProjectName, setNewProjectName] = useState("");
  let [creatingProject, setCreatingProject] = useState(false);
  let [editingProject, setEditingProject] = useState(null);

  const inputChangedHandler = (event) => {
    setNewProjectName(event.target.value);
  };

  const editInputChangedHandler = (event) => {
    setEditingProject({ ...editingProject, name: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addProject({ name: newProjectName });
    setNewProjectName("");
    setCreatingProject(false);
  };

  const renderLinkName = (project) => (
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

  let createProject = (
    <form
      onSubmit={onSubmit}
      className="col-span-full mb-3 flex items-center flex-col md:flex-row"
    >
      <input
        type="text"
        name="newProjectName"
        id="newProjectName"
        placeholder="Enter a project name"
        className="p-1.5 w-full md:w-2/4 md:mr-3 rounded"
        autoFocus
        value={newProjectName}
        onChange={(event) => inputChangedHandler(event)}
      />
      <div className="flex mt-1 items-center">
        <button className="bg-blue-500 py-1 px-4 rounded text-gray-100 hover:bg-blue-600">
          Add Project
        </button>
        <div
          className="text-gray-600 ml-3 hover:text-gray-900 py-1 cursor-pointer"
          onClick={() => (setNewProjectName(""), setCreatingProject(false))}
        >
          <XIcon className="h-5 w-5" />
        </div>
      </div>
    </form>
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
        {creatingProject ? createProject : null}
        <ul className="col-span-full">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <li key={project._id} className="flex m-1 items-center">
                {editingProject ? (
                  editingProject._id === project._id ? (
                    <>
                      <input
                        type="text"
                        value={editingProject.name}
                        onChange={(event) => editInputChangedHandler(event)}
                        className="p-1 mr-3 rounded"
                        autoFocus
                      />
                      <button
                        onClick={() => (
                          updateProject(editingProject), setEditingProject(null)
                        )}
                        className="bg-blue-500 py-1 px-4 rounded text-gray-100 hover:bg-blue-600"
                      >
                        Update Project
                      </button>
                      <div
                        className="text-gray-600 ml-3 hover:text-gray-900 py-1 cursor-pointer"
                        onClick={() => setEditingProject(false)}
                      >
                        <XIcon className="h-5 w-5" />
                      </div>
                    </>
                  ) : (
                    // console.log("HERE: ", editingProject)
                    renderLinkName(project)
                  )
                ) : (
                  renderLinkName(project)
                )}
                {/* <Link to={`/project/${project._id}`} className="pr-9">
                  {project.name}
                </Link> */}

                {/* <TrashIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setConfirmDelete(project)}
                /> */}
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
