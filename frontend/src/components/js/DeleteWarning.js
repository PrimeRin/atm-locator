import React from "react";
import "../css/DeleteWarning.css";

export default function DeleteWarning({onCancel, onDeleteConfirm}) {
  return (
    <div className="warning-con">
      <span className="delete-heading">Delete ATM?</span>
      <span>
        Are you sure you want to delete the following ATM? Deleting will
        result in permanently removing all information related to this ATM.
      </span>
      <div className="delete-atm-warning">
        <span>ATM ID</span>
        <span>atm name</span>
      </div>
      <div className='warning-btn'>
        <button className="warning-cancel-btn" onClick={onCancel}>CANCEL</button>
        <button className="warning-delete-btn" onClick={onDeleteConfirm}>DELETE</button>
      </div>
    </div>
  );
}
