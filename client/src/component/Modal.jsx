import React from "react";
import "../styles/modal.css";

const Modal = ({ isOpen, onClose, title, message, error }) => {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className={`modal-content ${error && "error"}`}>
        <div className="box">
          <h2 className="title">{title}</h2>
          <p>{message}</p>
          <button className="button" onClick={onClose}>
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
