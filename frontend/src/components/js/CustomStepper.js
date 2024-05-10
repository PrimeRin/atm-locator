import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { PiLineVertical } from "react-icons/pi";
import "../css/CustomStepper.css";

export default function CustomStepper({page}) {
  return (
    <div className="custom-stepper-con">
        <div className={`stepper-item ${page === 1 ? 'active' : ''}`}>
            <TiTick size={25} className="stepper-icon" />
            <span>Basic Information</span>
        </div>
        <div className="custom-stepper-item">
            <PiLineVertical size={25}/>
        </div>
        <div className={`stepper-item ${page === 2 ? 'active' : ''}`}>
            <MdOutlineModeEdit size={25} className="stepper-icon" />
            <span>Location</span>
        </div>
    </div>
  );
}
