import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  projects: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case actionTypes.GET_PROJECTS:
      console.log("getting project from reducer");
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};

export default projectReducer;
