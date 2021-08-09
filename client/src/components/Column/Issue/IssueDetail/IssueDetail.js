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
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <Field name="summary" component="input" />
            </div>

            <label className="block">
              <span className="text-gray-700">Description</span>
              <Field
                name="description"
                component="input"
                placeholder="Description"
                className="mt-1 block w-full"
              />
            </label>

            {/* <h2>An Aribirary Reusable Input Component</h2>
            <div>
              <label>Interests</label>
              <Field name="interests" component={InterestPicker} />
            </div> */}

            <h2>Render Function</h2>
            <Field
              name="bio"
              render={({ input, meta }) => (
                <div>
                  <label>Bio</label>
                  <textarea {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />

            <h2>Render Function as Children</h2>
            <Field name="phone">
              {({ input, meta }) => (
                <div>
                  <label>Phone</label>
                  <input type="text" {...input} placeholder="Phone" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <button type="submit">Submit</button>
          </form>
        )}
      />
      {/* <div className="">{issue.summary}</div> */}
    </div>
  );
};

export default IssueDetail;
