import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal = ({ show, modalClosed, children }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      className={`${classes.modal} fixed z-50 w-2/3 sm:w-[500px] shadow p-3 left-16/100 top-3/10 bg-white rounded-lg flex flex-col transition-all duration-300"`}
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
