import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import "../css/AtmInfo.css";
import { categoryToBankImage } from "./MarkerImg";

export default function AtmInfo({ atm, onClose }) {
  const pos = { lat: parseFloat(atm.latitude), lng: parseFloat(atm.longitude) };

  return (
    <InfoWindow className="atm-info-window" position={pos} onCloseClick={onClose}>
      <div className="atm-info-con">
        <span className="atm-info-heading">{atm.name}</span>
        <div className="line"></div>
        <span>
          {" "}
          <span className="label-bold">Service Status:</span>{" "}
          {atm.service_status}
        </span>
        <span>
          {" "}
          <span className="label-bold">Bank Branch:</span> {atm.bank_category}
        </span>
        <span>
          {" "}
          <span className="label-bold">Phone:</span> {atm.phone}
        </span>
        <span>
          <span className="label-bold">Website:</span>{" "}
          <a href={atm.website}>{atm.website} </a>
        </span>
        <img
          src={categoryToBankImage[atm.bank_category]}
          className="atm-info-img"
          alt="atm info"
        />
        <button className="google-map-btn">
          <a
            className="redirect-map"
            href={`http://www.google.com/maps/place/${atm.latitude},${atm.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Show in Google Map
          </a>
        </button>
      </div>
    </InfoWindow>
  );
}
