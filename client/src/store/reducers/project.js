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
  inputtingNewIssue: false,
};

const sortPopulatedProject = (project) => {
  let objectOfIssues = {};
  let toDoCol = [];
  let doingCol = [];
  let doneCol = [];

  project.column1Ids.forEach((issue) => {
    toDoCol.push(issue._id);
    objectOfIssues[issue._id] = issue;
  });

  project.column2Ids.forEach((issue) => {
    doingCol.push(issue._id);
    objectOfIssues[issue._id] = issue;
  });

  project.column3Ids.forEach((issue) => {
    doneCol.push(issue._id);
    objectOfIssues[issue._id] = issue;
  });

  return {
    objectOfIssues: objectOfIssues,
    toDoCol: toDoCol,
    doingCol: doingCol,
    doneCol: doneCol,
  };
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
      const sortedProject = sortPopulatedProject(action.payload);

      return {
        ...state,
        currentProject: action.payload,
        issues: sortedProject.objectOfIssues,
        columns: {
          ...state.columns,
          "column-1": {
            ...state.columns["column-1"],
            issueIds: sortedProject.toDoCol,
          },
          "column-2": {
            ...state.columns["column-2"],
            issueIds: sortedProject.doingCol,
          },
          "column-3": {
            ...state.columns["column-3"],
            issueIds: sortedProject.doneCol,
          },
        },
      };
    case actionTypes.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id
            ? { ...project, name: action.payload.name }
            : project
        ),
      };
    case actionTypes.ADD_ISSUE:
      const sortedProjectAfterIssueAdded = sortPopulatedProject(action.payload);
      return {
        ...state,
        issues: sortedProjectAfterIssueAdded.objectOfIssues,
        columns: {
          ...state.columns,
          "column-1": {
            ...state.columns["column-1"],
            issueIds: sortedProjectAfterIssueAdded.toDoCol,
          },
          "column-2": {
            ...state.columns["column-2"],
            issueIds: sortedProjectAfterIssueAdded.doingCol,
          },
          "column-3": {
            ...state.columns["column-3"],
            issueIds: sortedProjectAfterIssueAdded.doneCol,
          },
        },
      };
    case actionTypes.UPDATE_ISSUE:
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.payload.data._id]: action.payload.data,
        },
      };
    case actionTypes.DELETE_ISSUE:
      return {
        ...state,
        columns: {
          ...state.columns,
          "column-1": {
            ...state.columns["column-1"],
            issueIds: state.columns["column-1"].issueIds.filter(
              (id) => id !== action.payload
            ),
          },
          "column-2": {
            ...state.columns["column-2"],
            issueIds: state.columns["column-2"].issueIds.filter(
              (id) => id !== action.payload
            ),
          },
          "column-3": {
            ...state.columns["column-3"],
            issueIds: state.columns["column-3"].issueIds.filter(
              (id) => id !== action.payload
            ),
          },
        },
      };
    case actionTypes.SAME_COL_UPDATE:
      // console.log("[REDUCER Same COL]: ", action.payload);
      // console.log("RETURNING: ", {
      //   ...state,
      //   columns: {
      //     ...state.columns,
      //     [action.payload.id]: action.payload,
      //   },
      // });
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload,
        },
      };
    case actionTypes.DIF_COL_UPDATE:
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
