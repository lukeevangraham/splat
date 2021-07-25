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
      const convertArrayToObject = (array, key) =>
        array.reduce(
          (obj, item) => ({
            ...obj,
            [item[key]]: item,
          }),
          {}
        );

      const objectOfIssues = convertArrayToObject(action.payload.issues, "_id");

      let toDoCol = [];
      let doingCol = [];
      let doneCol = [];

      action.payload.issues.forEach((issue) => {
        switch (issue.status) {
          case "To do":
            toDoCol.push(issue._id);
            break;
          case "Doing":
            doingCol.push(issue._id);
            break;
          case "Done":
            doneCol.push(issue._id);
            break;
          default:
            break;
        }
      });

      return {
        ...state,
        currentProject: action.payload,
        issues: objectOfIssues,
        columns: {
          ...state.columns,
          ["column-1"]: {
            ...state.columns["column-1"],
            issueIds: toDoCol,
          },
          ["column-2"]: {
            ...state.columns["column-2"],
            issueIds: doingCol,
          },
          ["column-3"]: {
            ...state.columns["column-3"],
            issueIds: doneCol,
          },
        },
      };
    case actionTypes.ADD_ISSUE:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          issues: action.payload.issues,
        },
      };
    case actionTypes.SAME_COL_UPDATE:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload,
        },
      };
    case actionTypes.DIF_COL_UPDATE:
      console.log("HERE: ", action.payload);
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.newStart.id]: action.payload.newStart,
          [action.payload.newFinish.id]: action.payload.newFinish,
        },
      };
    default:
      return state;
  }
};

export default projectReducer;
