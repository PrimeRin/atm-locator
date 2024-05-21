import React, { useState, useEffect, useRef } from "react";
import "../css/Map.css";
import AtmCategory from "./AtmCategory";
import { categoryToImage } from "./MarkerImg";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { atmList } from "../service/atmList";
import UserLocation from "./UserLocation";
import CurrentLocation from "./CurrentLocation";
import AtmInfo from "./AtmInfo";
import { BiCurrentLocation } from "react-icons/bi";

export default function Map() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const center = { lat: 27.522087, lng: 90.253892 };
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const { currentLocation, error } = UserLocation();
  const [selectedAtm, setSelectedAtm] = useState(null);
  const [showCurrentLocation, setShowCurrentLocation] = useState(currentLocation !== null);

  const [checkboxStates, setCheckboxStates] = useState({
    BDBL: true,
    BNB: false,
    BOB: false,
    DPNB: false,
    TB: false,
  });

  useEffect(() => {
    const fetchData = async (page) => {
      const response = await atmList(page);
      const { data, hasMore } = response;
      setData((prevData) => [...prevData, ...data]);

      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
        fetchData(page + 1);
      }
    };

    fetchData(page);
  }, [page]);

  console.log('map data', data);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
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

  const handleClickOnCurrentLocation = () => {
    setShowCurrentLocation(true);
    map.setCenter(currentLocation);
    map.setZoom(map.getZoom() + 1.5);
  };

  function openDialog(atm) {
    map.setZoom(map.getZoom() + 1.5);
    map.setCenter({
      lat: atm.latitude,
      lng: atm.longitude,
    });
    if (map.getZoom() >= 13) {
      setSelectedAtm(atm);
    }
  }

  return (
    <div className="map-container">
      <div className="google-map-con">
        <GoogleMap
          ref={mapRef}
          center={center}
          zoom={9}
          mapContainerStyle={{ width: "60vw", height: "40vw" }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          {data
            .filter((atm) => checkboxStates[atm.bank_category])
            .map((atm, index) => (
              <Marker
                key={index}
                position={{
                  lat: atm.latitude,
                  lng: atm.longitude,
                }}
                icon={{
                  url: categoryToImage[atm.bank_category],
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => {
                  openDialog(atm);
                }}
              />
            ))}
          <>
            {showCurrentLocation && (
              <CurrentLocation
                pos={currentLocation}
                onClick={handleClickOnCurrentLocation}
                onClose = {() => setShowCurrentLocation(false)}
              />
            )}

            {selectedAtm && <AtmInfo atm={selectedAtm} />}
          </>
        </GoogleMap>
        <div className="current-location-icon" onClick={handleClickOnCurrentLocation}>
          <BiCurrentLocation size={25} style={{ color: 'blue' }}/>
        </div>
      </div>
      <div className="atm-filter">
        <span className="atm-heading">Filter ATM</span>
        <ul className="atm-categories">
          <AtmCategory
            imageSrc={categoryToImage["BDBL"]}
            text="BDBL"
            checked={checkboxStates.BDBL}
            onChange={() => handleCheckboxChange("BDBL")}
          />
          <AtmCategory
            imageSrc={categoryToImage["BNB"]}
            text="BNB"
            checked={checkboxStates.BNB}
            onChange={() => handleCheckboxChange("BNB")}
          />
          <AtmCategory
            imageSrc={categoryToImage["BOB"]}
            text="BOB"
            checked={checkboxStates.BOB}
            onChange={() => handleCheckboxChange("BOB")}
          />
          <AtmCategory
            imageSrc={categoryToImage["DPNB"]}
            text="DPNB"
            checked={checkboxStates.DPNB}
            onChange={() => handleCheckboxChange("DPNB")}
          />
          <AtmCategory
            imageSrc={categoryToImage["TB"]}
            text="Tbank"
            checked={checkboxStates.TB}
            onChange={() => handleCheckboxChange("TB")}
          />
        </ul>
      </div>
    </div>
  );
}
