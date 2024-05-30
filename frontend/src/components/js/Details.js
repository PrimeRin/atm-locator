import React from "react";
import "../css/Details.css";
import atm_img from "../../assets/amcs/BOB-ATM/bob/bob.png";
import { FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { bankFullName } from "./bankFullName";
import { categoryToBankImage } from "./MarkerImg";

export default function Details({ onSelect, data }) {
  return (
    <div className="admin-atm-details" onClick={onSelect}>
      <div className="atm-details-header">
        <div className="atm-details-img-con">
          <img src={categoryToBankImage[data.bank_category]} className="atm-details-img" alt="ATM" />
        </div>
      </div>
      <div className="atm-details-body">
        <div className="atm-details-fields">
          <span className="atm-details-id">{data.id}</span>
          <span className="atm-details-name">{data.name}</span>
          <div className="atm-details-con">
            <span className="atm-details-label">Bank Category</span>
            <span className="atm-details-value-bank">
              {bankFullName[data.bank_category]}
            </span>
          </div>

          <div className="atm-details-con">
            <span className="atm-details-label">Status</span>
            <span className="atm-details-value-bank">
              {data.service_status}
            </span>
          </div>

          <div className="atm-details-con">
            <span className="atm-details-label">Contact Information</span>
            <div className="atm-details-contact-con">
              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FaEnvelope />
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Email</span>
                  <span>{data.email}</span>
                </div>
              </div>

              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FaPhone />
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Phone</span>
                  <span>{data.phone}</span>
                </div>
              </div>

              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FaGlobe />
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Website</span>
                  <span>
                    <a href={data.website} target="_blank" rel="noopener noreferrer">
                      {data.website}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="atm-details-con">
            <span className="atm-details-label">Location Detail</span>
            <div className="atm-details-contact-con">
              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FiMapPin />
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Dzongkhag</span>
                  <span>{data.dzongkhag}</span>
                </div>
              </div>

              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FiMapPin />
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Gewog</span>
                  <span>{data.gewog}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="atm-details-map">
          <span className="atm-details-location">Map</span>
          <span className="atm-details-value-bank">
            lat: {data.latitude}, lng: {data.longitude}
          </span>
          <iframe
            width="550"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&hl=es;z=14&output=embed&maptype=satellite`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
