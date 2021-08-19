import React from "react";

const Backdrop = ({ show, clicked }) => (
  <div
    className={
      show ? "w-full h-full fixed top-0 bg-black bg-opacity-50 z-30 backdrop-filter backdrop-blur-sm" : null
    }
    style={{ top: 0 }}
    onClick={clicked}
  ></div>
);

export default Backdrop;
