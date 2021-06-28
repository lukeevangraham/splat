import * as actionTypes from "./actionsTypes";
import axios from "axios";
// import Projects from "../../containers/Projects/Projects";

export const addProject = (projectData) => async (dispatch) => {
  const response = await axios.post("/api/project", projectData);

  dispatch({
    type: actionTypes.ADD_PROJECT,
    payload: response.data,
  });
};

export const getProjects = () => async (dispatch) => {
  console.log("getting projects!")
  const response = await axios.get("/api/project");

  dispatch({ type: actionTypes.GET_PROJECTS, payload: response.data });
};
