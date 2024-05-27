import React, { useState } from "react";
import "../css/RegisterForm.css";
import CustomInput from "./CustomInput";
import CustomDropdown from "./CustomDropdown";
import { dzongkhags, gewogs } from "./dzongkhags_list";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({
  page,
  onNext,
  onBack,
  data,
  formData,
  onType,
  error,
  onSubmit,
  formReset,
}) {
  const navigate = useNavigate();

  const gewog_options = [];
  gewogs.forEach((dzongkhag) => {
    for (const key in dzongkhag) {
      if (Object.hasOwnProperty.call(dzongkhag, key)) {
        const gewogsArr = dzongkhag[key];
        gewogsArr.forEach((gewog) => {
          gewog_options.push(gewog);
        });
      }
    }
  });

  function getGewogsByName(name) {
    for (let i = 0; i < gewogs.length; i++) {
      if (Object.keys(gewogs[i])[0] === name) {
        return gewogs[i][name];
      }
    }
    return null;
  }

  function handleCancel() {
    formReset();
  }

  return (
    <div className="atm-register-con">
      {page === 1 && (
        <div className="register-page-1">
          <div className="register-page-1-hd">
            <span className="register-heading">Basic Information</span>
            <span>Please fill the basic information of the ATM</span>
            <CustomInput
              label="ATM Name*"
              value="name"
              formData={formData.name ? formData.name : ""}
              onType={onType}
            />
            <span className="register-sub-heading">Add Location Manually</span>
            <div className="register-location-col">
              <div className="register-location-row">
                <CustomInput
                  label="Location Name*"
                  value="location_name"
                  formData={
                    formData.location_name ? formData.location_name : ""
                  }
                  onType={onType}
                />
              </div>

              <div className="register-location-row">
                <CustomDropdown
                  label="Dzongkhag*"
                  value="dzongkhag"
                  options={dzongkhags}
                  onType={onType}
                  formData={formData.dzongkhag ? formData.dzongkhag : ""}
                />
                <CustomDropdown
                  label="Gewog*"
                  value="gewog"
                  options={
                    formData.dzongkhag
                      ? getGewogsByName(formData.dzongkhag)
                      : gewog_options
                  }
                  onType={onType}
                  formData={formData.gewog ? formData.gewog : ""}
                />
              </div>
            </div>

            <span className="register-sub-heading">
              Add Contact Information
            </span>
            <div className="register-location-col">
              <div className="register-location-row">
                <CustomInput
                  label="Website address*"
                  value="website"
                  onType={onType}
                  formData={formData.website ? formData.website : ""}
                />
              </div>

              <div className="register-location-row">
                <CustomInput
                  label="Email Address*"
                  value="email"
                  onType={onType}
                  formData={formData.email ? formData.email : ""}
                />
                <CustomInput
                  label="Contact Number*"
                  value="phone"
                  data={data ? data.phone : ""}
                  onType={onType}
                  formData={formData.phone ? formData.phone : ""}
                />
              </div>
            </div>

            <span className="register-sub-heading">Service Status</span>
            <div className="register-service-info">
              <span
                className={`service-status ${
                  (formData && formData.service_status === "Always Open")
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  onType("service_status", "Always Open");
                }}
              >
                Always Open
              </span>
              <span
                className={`service-status ${
                  (formData && formData.service_status === "Inactive")
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  onType("service_status", "Inactive");
                }}
              >
                Inactive
              </span>

              <span
                className={`service-status ${
                  (formData && formData.service_status === "Maintenance")
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  onType("service_status", "Maintenance");
                }}
              >
                Maintenance
              </span>
              <span
                className={`service-status ${
                  (formData && formData.service_status === "Custom Time")
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  onType("service_status", "Custom Time");
                }}
              >
                Custom Time
              </span>
            </div>
            <div className="register-location-row">
              {formData.service_status === "Custom Time" && (
                <CustomInput
                  label="Custom Time"
                  value="custom_time"
                  onType={onType}
                  formData={formData.custom_time ? formData.custom_time : ""}
                />
              )}
              <span className="blank-none"></span>
            </div>
            <div className="error-message">
              {error ? <span className="error-text">{error}</span> : null}
            </div>
          </div>
          <div className="register-page-1-ft">
            <div className="register-button">
              <button className="register-cancel" onClick={handleCancel}>
                CANCEL
              </button>
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
              <CustomInput
                label="Latitude*"
                value="latitude"
                onType={onType}
                formData={formData.latitude ? formData.latitude : ""}
              />
              <CustomInput
                label="Longitude*"
                value="longitude"
                onType={onType}
                formData={formData.longitude ? formData.longitude : ""}
              />
            </div>

            <span className="register-sub-heading">Display Map</span>
            <div className="show-map">
              <div className="show-map-text">
                <span>Check the location of the ATM in the map.</span>
                <div className="map-loader"></div>
              </div>

              <iframe
                className="show-map-iframe"
                width="500"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${
                  formData ? formData.latitude : "40.7128"
                },${
                  formData ? formData.longitude : "-74.0060"
                }&hl=es;z=14&output=embed&maptype=satellite`}
              ></iframe>
            </div>
            <div className="error-message">
              {error ? <span className="error-text">{error}</span> : null}
            </div>
          </div>

          <div className="register-page-2-ft">
            <div className="save-button">
              <button className="register-cancel" onClick={handleCancel}>
                CANCEL
              </button>
              <div className="inner-save-button">
                <button className="register-back" onClick={onBack}>
                  BACK
                </button>
                <button className="register-create" onClick={onSubmit}>
                  {" "}
                  {data ? "UPDATE" : "CREATE"}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
