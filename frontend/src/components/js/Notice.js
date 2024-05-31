import React from "react";
import { TiTick } from "react-icons/ti";
import { RiAlertFill } from "react-icons/ri";
import "../css/Notice.css";

export default function Notice({ type, message, showNotice }) {
  const backgroundColor = type === 'error' ? '#ef9090' : '#8dcdf5';
  const iconBackground = type === 'error' ? '#da0909' : '#13711b';

  return (
    <>
      {showNotice && (
        <div className="notice-con" style={{ backgroundColor }}>
          <div className="message-icon" style={{ backgroundColor: iconBackground }}>
            {type === 'error' ? <RiAlertFill size={25} /> : <TiTick size={25} />}
          </div>
          <div className="message">
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
}
