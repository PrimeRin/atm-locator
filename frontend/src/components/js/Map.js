import React, { useState, useEffect } from "react";
import "../css/Map.css";
import AtmCategory from "./AtmCategory";
import { categoryToImage } from "./MarkerImg";
import { allAtmData } from "../service/allAtmData";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

export default function Map() {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const center = { lat: 27.522087, lng: 90.253892 };

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

  const [atmData, setAtmData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await allAtmData();
      setAtmData(data);
    };
    fetchData();
  }, []);

  console.log('I am hjere',atmData);

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

  return (
    <div className="map-container">
      <GoogleMap
        center={center}
        zoom={8.45}
        mapContainerStyle={{ width: "60vw", height: "40vw" }}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
        onLoad={(map) => setMap(map)}
      >
        {atmData.map((atm, index) => (
            <Marker
              key={index}
              position={{
                lat: atm.lat,
                lng: atm.lng,
              }}
              icon={{
                url: categoryToImage[atm.category],
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => {
                // openDialog(atm);
              }}
            />
          ))}
      </GoogleMap>
      <div className="atm-filter">
        <span className="atm-heading">Filter ATM</span>
        <ul className="atm-categories">
          <AtmCategory
            imageSrc={categoryToImage["hotel"]}
            text="AMC"
            checked={checkboxStates.amc}
            onChange={() => handleCheckboxChange("amc")}
          />
          <AtmCategory
            imageSrc={categoryToImage["hotel"]}
            text="BDBL"
            checked={checkboxStates.bdbl_atm}
            onChange={() => handleCheckboxChange("bdbl_atm")}
          />
          <AtmCategory
            imageSrc={categoryToImage["bnb_atm"]}
            text="BNB"
            checked={checkboxStates.bnb_atm}
            onChange={() => handleCheckboxChange("bnb_atm")}
          />
          <AtmCategory
            imageSrc={categoryToImage["bob_atm"]}
            text="BOB"
            checked={checkboxStates.bob_atm}
            onChange={() => handleCheckboxChange("bob_atm")}
          />
          <AtmCategory
            imageSrc={categoryToImage["dpnb_atm"]}
            text="DPNB"
            checked={checkboxStates.dpnb_atm}
            onChange={() => handleCheckboxChange("dpnb_atm")}
          />
          <AtmCategory
            imageSrc={categoryToImage["tbl_atm"]}
            text="Tbank"
            checked={checkboxStates.tbl_atm}
            onChange={() => handleCheckboxChange("tbl_atm")}
          />
        </ul>
      </div>
    </div>
  );
}
