import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  projects: [],
  currentProject: "",
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case actionTypes.GET_PROJECTS:
      return { ...state, projects: action.payload };
    case actionTypes.GET_PROJECT:
      return { ...state, currentProject: action.payload };
    default:
      return state;
  }
};

export default projectReducer;
