import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { TrashIcon } from "@heroicons/react/outline";
import { deleteIssue } from "../../../../store/actions/project";

const IssueDetail = ({ issue, onSubmit, cancelModal, deleteIssue }) => {
  // let [summary, setSummary] = useState(issue.summary)
  // let [notes, setNotes] = useState(issue.notes)

  const deleteHandler = () => {
    cancelModal();
    deleteIssue(issue._id);
    console.log("CLOSE TIME");
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          summary: issue.summary,
          description: issue.description ? issue.description : null,
          priority: issue.priority ? issue.priority : 3,
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <label
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(100px, 1fr) minmax(8px, 40px)",
              }}
            >
              {/* <span className="text-gray-700">Issue Summary</span> */}
              <Field
                name="summary"
                component="input"
                type="text"
                className="mt-1 mr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-bold"
              />
              <div
                className="mt-1 rounded-md hover:bg-gray-200 cursor-pointer flex items-center justify-center"
                onClick={cancelModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </label>

            <label className="block">
              <span className="text-gray-700">Description</span>
              <Field
                name="description"
                component="textarea"
                placeholder="Description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="6"
              />
            </label>

            {/* <label className="block">
              <span className="text-gray-700">Priority</span>
              <Field
                name="priority"
                component="select"
                className="block w-auto mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
            </label> */}

            <div className="flex justify-between">
              <button
                type="submit"
                className="w-2/5 bg-blue-500 hover:bg-blue-700 text-white fold-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <div
                className="bg-red-500 py-2 px-4 text-white rounded cursor-pointer hover:bg-red-600"
                onClick={() => deleteHandler()}
              >
                <TrashIcon className="h-5 w-5" />
              </div>
            </div>
          </form>
        )}
      />
      {/* <div className="">{issue.summary}</div> */}
    </div>
  );
};

export default connect(null, { deleteIssue })(IssueDetail);
