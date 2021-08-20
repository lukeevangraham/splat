import React, { useEffect } from "react";
import Button from "../UI/Button/Button";
import { XIcon } from "@heroicons/react/outline";

import "./ProjectForm.css";

const ProjectForm = ({
  onSubmit,
  value,
  onChange,
  onCancel,
  name,
  placeholder,
  submitButtonText,
}) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onCancel();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onCancel]);

  return (
    <form
      onSubmit={onSubmit}
      className="col-span-full w-full mb-3 flex items-center flex-col md:flex-row"
    >
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        className="p-1.5 w-full md:w-2/4 md:mr-3 rounded"
        autoFocus
        value={value}
        onChange={(event) => onChange(event)}
      />
      <div className="flex mt-1 items-center">
        <Button type="submit">{submitButtonText}</Button>
        <div
          className="buttonLess text-gray-600 ml-3 hover:text-gray-900 py-1 cursor-pointer"
          onClick={onCancel}
          type="button"
        >
          <XIcon className="h-5 w-5" />
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
