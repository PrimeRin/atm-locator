import React from "react";
import "../css/AtmHeader.css";
import { SlArrowLeft } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate,  useLocation} from "react-router-dom";
import DeleteWarning from "./DeleteWarning";

export default function AtmHeader({
  showDropdown,
  onSelect,
  showWarning,
  onDelete,
  onCancel,
  onDeleteConfirm,
  text,
  showThreeDot,
  data
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = () => {
    navigate("/admin-atm-list");
  };

  const navigateEdit = () => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}/edit`;
    navigate(newPath);
  }

  return (
    <div className="admin-atm-header">
      <div className="back-and-details">
        <div className="back-btn">
          <SlArrowLeft className="back-icon" onClick={navigateBack} />
        </div>
        <div className="atm-details"> {text} </div>
      </div>
      {showThreeDot && <BsThreeDotsVertical className="dots-icon" onClick={onSelect} />}

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item-con" onClick={navigateEdit}>
            <MdOutlineModeEdit size={25} />
            <span className="atm-edit-btn">Edit</span>
          </div>
          <div className="dropdown-item-con" onClick={onDelete}>
            <MdDeleteOutline size={25} />
            <span className="atm-edit-btn">
              Delete
            </span>
          </div>
        </div>
      )}

      {showWarning && (
        <DeleteWarning onCancel={onCancel} onDeleteConfirm={onDeleteConfirm} atm={data} />
      )}
    </div>
  );
}
