import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  projects: [],
  currentProject: {
    issues: [],
  },
  issues: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      issueIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      issueIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      issueIds: [],
    },
  },
  // FACILITATE REORDERING OF THE COLUMNS
  columnOrder: ["column-1", "column-2", "column-3"],
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
      const objectOfIssues = action.payload.issues.reduce(
        (result, item, index, array) => {
          result[item._id] = item;
          return result;
        }
      );
      console.log("HERE: ", objectOfIssues);
      return {
        ...state,
        currentProject: action.payload,
        issues: objectOfIssues,
      };
    case actionTypes.ADD_ISSUE:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          issues: action.payload.issues,
        },
      };
    default:
      return state;
  }
};

export default projectReducer;
