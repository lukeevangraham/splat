import { connect } from "react-redux";
import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
  getProject,
  sameColUpdate,
  diffColUpdate,
} from "../../store/actions/project";
// import IssueColumns from "../../components/IssueColumns/IssueColumns";
import Column from "../../components/Column/Column";

const Project = ({
  match,
  getProject,
  sameColUpdate,
  diffColUpdate,
  currentProject,
  beautifulDNDData,
}) => {
  useEffect(() => {
    getProject(match.params.id);
  }, [getProject, match.params.id]);

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
    <div>
      <div>{currentProject.name}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 350px)",
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
              />
            );
          })}
        </div>
      </DragDropContext>
      {/* <IssueColumns project={currentProject} /> */}
    </div>
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
})(Project);
