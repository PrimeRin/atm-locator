import React, { useState } from "react";
import "./Map.css";
import AtmCategory from "./AtmCategory";
import MarkerImg from "./MarkerImg";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

export default function Map() {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const rma = { lat: 27.482344, lng: 89.63364 };
  const [checkboxStates, setCheckboxStates] = useState({
    amc: true,
    hotel: true,
    resort: true,
    standalone: true,
    bdbl_atm: true,
    bnb_atm: true,
    bob_atm: true,
    dpnb_atm: true,
    tbl_atm: true,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <span>Loading</span>;
  }

  const handleCheckboxChange = (key) => {
    setCheckboxStates({
      ...checkboxStates,
      [key]: !checkboxStates[key],
    });
  };

  console.log(MarkerImg({category:"bob_atm"}));

  return (
    <div className="map-container">
      <GoogleMap
        center={rma}
        zoom={8.5}
        mapContainerStyle={{ width: "60vw", height: "40vw" }}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
        onLoad={(map) => setMap(map)}
      ></GoogleMap>
      <div className="atm-filter">
        <span className="atm-heading">Filter ATM</span>
        <ul className="atm-categories">
          <AtmCategory
            imageSrc={MarkerImg({category:"hotel"})}
            text="AMC"
            checked={checkboxStates.amc}
            onChange={() => handleCheckboxChange("amc")}
          />
          <AtmCategory
            imageSrc={MarkerImg({category:"hotel"})}
            text="BDBL"
            checked={checkboxStates.bdbl_atm}
            onChange={() => handleCheckboxChange("bdbl_atm")}
          />
          <AtmCategory
            imageSrc={MarkerImg({category:"bnb_atm"})}
            text="BNB"
            checked={checkboxStates.bnb_atm}
            onChange={() => handleCheckboxChange("bnb_atm")}
          />
          <AtmCategory
            imageSrc={MarkerImg({category:"bob_atm"})}
            text="BOB"
            checked={checkboxStates.bob_atm}
            onChange={() => handleCheckboxChange("bob_atm")}
          />
          <AtmCategory
            imageSrc={MarkerImg({category:"dpnb_atm"})}
            text="DPNB"
            checked={checkboxStates.dpnb_atm}
            onChange={() => handleCheckboxChange("dpnb_atm")}
          />
          <AtmCategory
            imageSrc={MarkerImg({category:"tbl_atm"})}
            text="Tbank"
            checked={checkboxStates.tbl_atm}
            onChange={() => handleCheckboxChange("tbl_atm")}
          />
        </ul>
      </div>
    </div>
  );
}
