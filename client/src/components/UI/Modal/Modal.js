import React from "react";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ show, modalClosed, children }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      className="fixed z-50 bg-white w-4/6 h-4/6 shadow p-6 inset-0 m-auto rounded-xl transition-all duration-300"
      style={{
        transform: show ? `translateY(0)` : `translateY(-100vh)`,
        opacity: show ? `1` : `0`,
      }}
    >
      {children}
    </div>
  </>
);

export default Modal;
