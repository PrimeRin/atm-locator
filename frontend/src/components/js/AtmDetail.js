import React, { useState, useEffect } from "react";
import "../css/NewAtm.css";
import Layout from "../layout/Layout";
import LabeledInput from "./LabeledInput";
import LabeledInputXL from "./LabeledInputXL";
import Dropdown from "./Dropdown";
import { dzongkhags } from "./dzongkhags_list";
import atm from "../../assets/img/atm.png";
import { useParams } from 'react-router-dom';
import { fetchAtmDetails } from "../service/atmDetail";

export default function AtmDetail() {
 const { id } = useParams();
 const [atmData, setAtmData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchAtmDetails(id);
      setAtmData(data);
    };

    fetch();
  }, [id]);

  return (
    <Layout>
      <div className="out-con">
        <div className="img-con">
          <img src={atm} className="img-atm" />
        </div>
        <div className="new-atm-con">
        <span className="heading">ATM DETAILS</span>
          <Dropdown
            label="Bank Type:"
            value={atmData.category}
            disabled='disabled'
            name="selectedBank"
          />
          <span className="heading">Location Details</span>
          <div className="location-detail">
            <div className="location">
              <LabeledInput
                label="Location Name:"
                type="text"
                value={atmData.locationName}
                disabled='disabled'
                name="locationName"
                placeholder={"Enter Location Name"}
              />
              <Dropdown
                label="Dzongkhag:"
                value={atmData.dzongkhag}
                disabled={'disabled'}
                name="dzongkhag"
              />
              <Dropdown
                label="Gewog:"
                value={atmData.gewog}
                disabled={'disabled'}
                name="gewog"
              />
            </div>
            <div className="lat-lng">
              <LabeledInput
                label="Latitude:"
                type="text"
                value={atmData.lat}
                disabled='disabled'
                name="lat"
                placeholder={"Enter Latitude"}
              />
              <LabeledInput
                label="Longitude:"
                type="text"
                value={atmData.lng}
                disabled='disabled'
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
              value={atmData.email}
              disabled='disabled'
              name="email"
              placeholder={"Enter Email"}
            />
            <LabeledInputXL
              label="Phone No:"
              type="text"
              value={atmData.phone}
              disabled='disabled'
              name="phone"
              placeholder={"Enter Phone No"}
            />
            <LabeledInputXL
              label="Website:"
              type="text"
              value={atmData.website}
              disabled='disabled'
              name="website"
              placeholder={"Enter Website"}
            />
          </div>
          <span className="heading">Service Info</span>
          <div className="service-info">
            <Dropdown
              label="Service:"
              value={atmData.service}
              disabled='disabled'
              name="service"
            />
          </div>
          <div className="btn-con">
            <button className="submit-btn">Create</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
