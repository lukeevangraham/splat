import React from "react";

const Button = (props) => (
  <button
    className="bg-blue-500 py-1 px-4 rounded text-gray-100 hover:bg-blue-600"
    onClick={props.clicked}
    type={props.type}
  >
    {props.children}
  </button>
);

export default Button;
