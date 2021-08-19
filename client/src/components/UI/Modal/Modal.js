import React from "react";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ show, modalClosed, children }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <div className="fixed inset-0 h-full w-full flex flex-col z-50 transition-all duration-300 items-center" style={{
          transform: show ? `translateY(0)` : `translateY(-100vh)`,
          opacity: show ? `1` : `0`,
        }}>
      <div className="flex-grow"></div>
      <div
        className="flex-grow-0 bg-white w-4/6 shadow p-6 rounded-xl flex items-center"
        
      >
        {children}
      </div>
      <div className="flex-grow"></div>
    </div>
  </>
);

export default Modal;
