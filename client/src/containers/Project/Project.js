import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Modal from "../../components/UI/Modal/Modal";
import IssueDetail from "../../components/Column/Issue/IssueDetail/IssueDetail";
import {
  getProject,
  sameColUpdate,
  diffColUpdate,
  updateIssue,
} from "../../store/actions/project";
// import IssueColumns from "../../components/IssueColumns/IssueColumns";
import Column from "../../components/Column/Column";

const Project = ({
  match,
  getProject,
  sameColUpdate,
  diffColUpdate,
  updateIssue,
  currentProject,
  beautifulDNDData,
}) => {
  const [editingIssue, setEditingIssue] = useState(null);

  useEffect(() => {
    getProject(match.params.id);
  }, [getProject, match.params.id]);

  const editIssueHandler = (issue) => {
    setEditingIssue(issue);
  };

  const editIssueCancelHandler = () => {
    setEditingIssue(null);
  };

  const editIssueSubmission = (formValues) => {
    updateIssue(editingIssue._id, formValues);
    setEditingIssue(null);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = beautifulDNDData.columns[source.droppableId];
    const finish = beautifulDNDData.columns[destination.droppableId];

    // Moving within the same list
    if (start === finish) {
      const newIssueIds = Array.from(start.issueIds);
      newIssueIds.splice(source.index, 1);
      newIssueIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        issueIds: newIssueIds,
      };

      sameColUpdate(newColumn, match.params.id);
      return;
    }

    // Moving from one list to another
    const startIssueIds = Array.from(start.issueIds);

    startIssueIds.splice(source.index, 1);
    const newStart = {
      ...start,
      issueIds: startIssueIds,
    };

    const finishIssueIds = Array.from(finish.issueIds);
    finishIssueIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      issueIds: finishIssueIds,
    };

    diffColUpdate(newStart, newFinish, match.params.id);
  };

  return (
    <>
      <Modal show={editingIssue} modalClosed={editIssueCancelHandler}>
        {editingIssue ? (
          <IssueDetail issue={editingIssue} onSubmit={editIssueSubmission} />
        ) : null}
      </Modal>
      <div className="w-full m-auto md:w-11/12">
        <div className="text-lg text-gray-100 m-2 font-semibold">
          {currentProject.name}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(325px, 1fr))",
            }}
          >
            {beautifulDNDData.columnOrder.map((columnId) => {
              const column = beautifulDNDData.columns[columnId];
              const issues = column.issueIds.map(
                (issueId) => beautifulDNDData.issues[issueId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  issues={issues}
                  projectId={currentProject._id}
                  editing={editIssueHandler}
                />
              );
            })}
          </div>
        </DragDropContext>
        {/* <IssueColumns project={currentProject} /> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentProject: state.project.currentProject,
    beautifulDNDData: {
      issues: state.project.issues,
      columns: state.project.columns,
      columnOrder: state.project.columnOrder,
    },
  };
};

export default connect(mapStateToProps, {
  getProject,
  sameColUpdate,
  diffColUpdate,
  updateIssue,
})(Project);
