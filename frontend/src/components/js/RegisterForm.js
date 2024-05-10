import React, { useState } from "react";
import "../css/RegisterForm.css";
import CustomInput from "./CustomInput";
import CustomDropdown from "./CustomDropdown";

export default function RegisterForm() {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
  return (
    <div className="atm-register-con">
      <div className="register-page-1">
        <span className="register-heading">Basic Information</span>
        <span>Please fill the basic information of the ATM</span>
        <CustomInput label="ATM Name*" />
        <span className="register-sub-heading">Add Location Manually</span>
        <div className="register-location-col">
          <div className="register-location-row">
            <CustomInput label="Location Name*" />
          </div>

          <div className="register-location-row">
            <CustomDropdown label="Dzongkhag*" options={options} />
            <CustomDropdown label="Gewog*" options={options} />
          </div>
        </div>

        <span className="register-sub-heading">Add Contact Information</span>
        <div className="register-location-col">
          <div className="register-location-row">
            <CustomInput label="Website address*" />
          </div>

          <div className="register-location-row">
            <CustomInput label="Email Address*" />
            <CustomInput label="Contact Number*" />
          </div>
        </div>

        <span className="register-sub-heading">Service Status</span>
        <div className="register-service-info">
          <span className="service-status">Always Open</span>
          <span className="service-status">Inactive</span>
          <span className="service-status">Maintenance</span>
          <span className="service-status active">Custom Time</span>
        </div>
        <div className="register-location-row">
          <CustomInput label="Custom Time" />
          <span className="blank-none"></span>
        </div>
        <div className="register-button">
          <button className="register-cancel">CANCEL</button>
          <button className="register-next">NEXT</button>
        </div>
      </div>
      <div className="register-page-2"></div>
    </div>
  );
}
