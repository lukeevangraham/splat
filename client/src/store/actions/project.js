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
  console.log("getting project!")
  const response = await axios.get(`/api/project/${id}`);

  dispatch({ type: actionTypes.GET_PROJECT, payload: response.data });
};


export const addIssue = (issueData) => async (dispatch) => {
  console.log("[action]:", issueData)
  const response = await axios.post("/api/issue", issueData)

  dispatch({
      type: actionTypes.ADD_ISSUE,
      payload: response.data
  })
}