import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { RiAlertFill } from "react-icons/ri";
import "../css/Notice.css";

export default function Notice({ type, message, showNotice }) {
  const [show, setShow] = useState(showNotice);
  const backgroundColor = type === 'error' ? '#ef9090' : '#8dcdf5';
  const iconBackground = type === 'error' ? '#da0909' : '#13711b';

  useEffect(() => {
    if (showNotice) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showNotice]);

  return (
    <>
      {show && (
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
