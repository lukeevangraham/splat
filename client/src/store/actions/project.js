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

export const getProject = (id) => async (dispatch) => {
  const response = await axios.get(`/api/project/${id}`);

  dispatch({ type: actionTypes.GET_PROJECT, payload: response.data });
};

export const sameColUpdate = (colData, id) => async (dispatch) => {
  // const responseCol = await axios.put(`/api/project/${id}`, colData);
  axios.put(`/api/project/${id}`, colData);
  dispatch({ type: actionTypes.SAME_COL_UPDATE, payload: colData });
};

export const diffColUpdate = (newStart, newFinish, id) => async (dispatch) => {
  axios.put(`/api/project/${id}`, { newStart: newStart, newFinish: newFinish });
  dispatch({
    type: actionTypes.DIF_COL_UPDATE,
    payload: { newStart, newFinish },
  });
};

export const addIssue = (issueData, column) => async (dispatch) => {
  const response = await axios.post("/api/issue", { issueData, column });

  dispatch({
    type: actionTypes.ADD_ISSUE,
    payload: response.data,
  });
  // dispatch({ type: actionTypes.GET_PROJECT, payload })
};

export const updateIssue = (issueData) => async (dispatch) => {
  console.log("projectAction: ", issueData);
  const response = await axios.put(`/api/issue${issueData._id}`);

  dispatch({
    type: actionTypes.UPDATE_ISSUE,
    payload: response,
  });
};
