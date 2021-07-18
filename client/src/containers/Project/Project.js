import { connect } from "react-redux";
import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { getProject } from "../../store/actions/project";
// import IssueColumns from "../../components/IssueColumns/IssueColumns";
import Column from "../../components/Column/Column";

const Project = ({ match, getProject, currentProject, beautifulDNDData }) => {
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

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newIssueIds = Array.from(start.issueIds);
      newIssueIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        issueIds: newIssueIds,
      }

      const 
      
    }
  };

  return (
    <div>
      <div>{currentProject.name}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        {beautifulDNDData.columnOrder.map((columnId) => {
          const column = beautifulDNDData.columns[columnId];
          console.log("BDND: ", beautifulDNDData);
          const issues = column.issueIds.map(
            (issueId) => beautifulDNDData.issues[issueId]
          );

          return <Column key={column._id} column={column} issues={issues} />;
        })}
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

export default connect(mapStateToProps, { getProject })(Project);
