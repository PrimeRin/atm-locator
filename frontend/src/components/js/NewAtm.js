import React, { useState } from "react";
import "../css/NewAtm.css";
import LabeledInput from "./LabeledInput";
import LabeledInputXL from "./LabeledInputXL";
import Dropdown from "./Dropdown";
import { dzongkhags } from "./dzongkhags_list";
import atm from "../../assets/img/atm.png";



export default function NewAtm() {
  const [formData, setFormData] = useState({
    selectedBank: "",
    locationName: "",
    dzongkhag: "",
    gewog: "",
    lat: "",
    lng: "",
    email: "",
    phone: "",
    website: "",
    service: "",
  });

  const bank_options = [
    { label: "Select a Bank Type", value: "default" },
    { label: "Bank of Bhutan", value: "bob" },
    { label: "Bhutan National Bank", value: "bnb" },
    { label: "Druk PNB", value: "dpnb" },
    { label: "Bhutan Development Bank Limited", value: "bdbl" },
    { label: "DK Bank", value: "dk" },
  ];

  const service_options = [
    { label: "Select a Service", value: "default" },
    { label: "Aways Open", value: "always_open" },
    { label: "9:00 AM - 5:00 PM", value: "9-5" },
    { label: "7:00 AM - 9:00 PM", value: "7-9" },
  ];

  const dzongkhag_options = [{ label: "Select a Dzongkhag", value: "default" }];

  dzongkhags.forEach((dzongkhag) => {
    dzongkhag_options.push({ label: dzongkhag, value: dzongkhag });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
      <div className="out-con">
        <div className="img-con">
          <img src={atm} className="img-atm" />
        </div>
        <div className="new-atm-con">
        <span className="heading">ATM REGISTRATION FORM</span>
          <Dropdown
            label="Bank Type:"
            options={bank_options}
            value={formData.selectedBank}
            onChange={handleChange}
            name="selectedBank"
          />
          <span className="heading">Location Details</span>
          <div className="location-detail">
            <div className="location">
              <LabeledInput
                label="Location Name:"
                type="text"
                value={formData.locationName}
                onChange={handleChange}
                name="locationName"
                placeholder={"Enter Location Name"}
              />
              <Dropdown
                label="Dzongkhag:"
                options={dzongkhag_options}
                value={formData.dzongkhag}
                onChange={handleChange}
                name="dzongkhag"
              />
              <Dropdown
                label="Gewog:"
                options={dzongkhag_options}
                value={formData.gewog}
                onChange={handleChange}
                name="gewog"
              />
            </div>
            <div className="lat-lng">
              <LabeledInput
                label="Latitude:"
                type="text"
                value={formData.lat}
                onChange={handleChange}
                name="lat"
                placeholder={"Enter Latitude"}
              />
              <LabeledInput
                label="Longitude:"
                type="text"
                value={formData.lng}
                onChange={handleChange}
                name="lng"
                placeholder={"Enter Longitude"}
              />
            </div>
          </div>
          <span className="heading">Contact Info</span>
          <div className="contact-detail">
            <LabeledInputXL
              label="Email:"
              type="text"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder={"Enter Email"}
            />
            <LabeledInputXL
              label="Phone No:"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              placeholder={"Enter Phone No"}
            />
            <LabeledInputXL
              label="Website:"
              type="text"
              value={formData.website}
              onChange={handleChange}
              name="website"
              placeholder={"Enter Website"}
            />
          </div>
          <span className="heading">Service Info</span>
          <div className="service-info">
            <Dropdown
              label="Service:"
              options={service_options}
              value={formData.service}
              onChange={handleChange}
              name="service"
            />
          </div>
          <div className="btn-con">
            <button className="submit-btn">Create</button>
          </div>
        </div>
      </div>
  );
}
