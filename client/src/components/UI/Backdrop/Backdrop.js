import React from "react";

const Backdrop = ({ show, clicked }) => (
  <div
    className={
      show ? "w-full h-full fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-filter backdrop-blur-sm" : null
    }
    onClick={clicked}
  ></div>
);

export default Backdrop;
