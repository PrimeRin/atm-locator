import React, { useState } from "react";
import "../css/RegisterForm.css";
import CustomInput from "./CustomInput";
import CustomDropdown from "./CustomDropdown";
import { dzongkhags } from "./dzongkhags_list";

export default function RegisterForm({ page, onNext, onBack }) {
  const dzongkhag_options = [];
  dzongkhags.forEach((dzongkhag) => {
    dzongkhag_options.push({ label: dzongkhag, value: dzongkhag });
  });
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="atm-register-con">
      {page === 1 && (
        <div className="register-page-1">
          <div className="register-page-1-hd">
            <span className="register-heading">Basic Information</span>
            <span>Please fill the basic information of the ATM</span>
            <CustomInput label="ATM Name*" />
            <span className="register-sub-heading">Add Location Manually</span>
            <div className="register-location-col">
              <div className="register-location-row">
                <CustomInput label="Location Name*" />
              </div>

              <div className="register-location-row">
                <CustomDropdown label="Dzongkhag*" options={dzongkhag_options} />
                <CustomDropdown label="Gewog*" options={dzongkhag_options} />
              </div>
            </div>

            <span className="register-sub-heading">
              Add Contact Information
            </span>
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
          </div>
          <div className="register-page-1-ft">
            <div className="register-button">
              <button className="register-cancel">CANCEL</button>
              <button className="register-next" onClick={onNext}>
                NEXT
              </button>
            </div>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="register-page-2">
          <div className="register-page-2-hd">
            <span className="register-heading">ATM Location Information</span>
            <span>Please enter the latitude and longitude for the ATM</span>

            <div className="register-location-row">
              <CustomInput label="Latitude*" />
              <CustomInput label="Longitude*" />
            </div>

            <span className="register-sub-heading">Display Map</span>
            <div className="show-map">
              <div className="show-map-text">
                <span>Click Here to show the location on the map</span>
                <div className="map-loader"></div>
              </div>

              <iframe
                className="show-map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m181m121m31d3151.83543450960362d-74.00603d40.71282m31f02f03f03m21i10242i7684f13.13m31m21s0x89c24fa5d33f083b%3A0xc80b8f06e177fe622sNew%20York%2C%20NY%2C%20USA5e03m21sen2sus4v16344902083905m21sen2sus"
                width="500"
                height="400"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="register-page-2-ft">
            <div className="save-button">
              <button className="register-cancel">CANCEL</button>
              <div className="inner-save-button">
                <button className="register-back" onClick={onBack}>
                  BACK
                </button>
                <button className="register-create">CREATE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
