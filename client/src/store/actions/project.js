import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const addProject = (projectData) => async (dispatch) => {
  const response = await axios.post("/api/project", projectData);

  dispatch({
    type: actionTypes.ADD_PROJECT,
    payload: response.data,
  });
};

export const getProjects = () => async (dispatch) => {
  const response = await axios.get("/api/project");

  dispatch({ type: actionTypes.GET_PROJECTS, payload: response.data });
};

// export const fetchProject = (id) => async (dispatch) => {
//   const response = await axios.get(`/api/project/${id}`);

//   dispatch({ type: actionTypes.GET_PROJECT, payload: response.data });
// };

export const fetchProject = (id) => async (dispatch) => {
  const response = await axios.get(`/api/project/${id}`);

  dispatch({ type: actionTypes.GET_PROJECT, payload: response.data });
};
