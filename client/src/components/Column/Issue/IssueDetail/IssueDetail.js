import React from "react";
import { Form, Field } from "react-final-form";

const IssueDetail = ({ issue, onSubmit }) => {
  // let [summary, setSummary] = useState(issue.summary)
  // let [notes, setNotes] = useState(issue.notes)

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
            <label className="block">
              {/* <span className="text-gray-700">Issue Summary</span> */}
              <Field
                name="summary"
                component="input"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-bold"
              />
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

            <label className="block">
              <span className="text-gray-700">Priority</span>
              <Field
                name="priority"
                component="select"
                className="block w-auto mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3" selected="selected">
                  3
                </option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
            </label>

            <button
              type="submit"
              className="w-2/5 bg-blue-500 hover:bg-blue-700 text-white fold-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
      />
      {/* <div className="">{issue.summary}</div> */}
    </div>
  );
};

export default IssueDetail;
