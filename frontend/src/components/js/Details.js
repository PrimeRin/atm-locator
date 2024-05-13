import React, { useState } from "react";
import "../css/Details.css";
import atm_img from "../../assets/amcs/BOB-ATM/bob/bob.png";
import { FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function Details({ onSelect }) {
  return (
    <div className="admin-atm-details" onClick={onSelect}>
      <div className="atm-details-header">
        <div className="atm-details-img-con">
          <img src={atm_img} className="atm-details-img" />
        </div>
      </div>
      <div className="atm-details-body">
        <div className="atm-details-fields">
          <span className="atm-details-id">ATMID</span>
          <span className="atm-details-name">Le Méridien Thimphu</span>
          <div className="atm-details-con">
            <span className="atm-details-label">Bank Category</span>
            <span className="atm-details-value-bank">Bank of Bhutan</span>
          </div>

          <div className="atm-details-con">
            <span className="atm-details-label">Service</span>
            <span className="atm-details-value-bank">Always Open</span>
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
                  <span>Bob@gmail.com</span>
                </div>
              </div>

              <div className="atm-details-contact-row">
                <span className="details-icon">
                  {" "}
                  <FaPhone />{" "}
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Phone</span>
                  <span>+975 12345678</span>
                </div>
              </div>

              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FaGlobe />{" "}
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Website</span>
                  <span>
                    <a>www.https://bob.bt</a>
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
                  <span>Thimphu</span>
                </div>
              </div>

              <div className="atm-details-contact-row">
                <span className="details-icon">
                  <FiMapPin />
                </span>
                <div className="atm-details-contact-col">
                  <span className="atm-details-label">Gewog</span>
                  <span>Changangkha</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="atm-details-map">
          <span className="atm-details-location">Map</span>
          <span className="atm-details-value-bank">
            lat: 23.000123230, lng: 90.345678
          </span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m181m121m31d3151.83543450960362d-74.00603d40.71282m31f02f03f03m21i10242i7684f13.13m31m21s0x89c24fa5d33f083b%3A0xc80b8f06e177fe622sNew%20York%2C%20NY%2C%20USA5e03m21sen2sus4v16344902083905m21sen2sus"
            width="550"
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
