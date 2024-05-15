import React, { useState, useEffect } from "react";
import "../css/FilterAtm.css";
import { dzongkhags } from "./dzongkhags_list";
import Pagination from "./Pagination";
import { atmList } from "../service/atmList";
import google_img from "../../assets/img/google-map.png";

export default function FilterAtm() {
  const [atmData, setAtmData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDzongkhag, setSelectedDzongkhag] = useState("Thimphu");
  const totalPages = 20;

  const onPageChange = async (pageNumber, dzongkhag) => {
    setCurrentPage(pageNumber);
    const data = await atmList(pageNumber, dzongkhag);
    setAtmData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await atmList(currentPage, selectedDzongkhag);
      setAtmData(data);
    };
    fetchData();
  }, [currentPage, selectedDzongkhag]);

  const handleDzongkhagChange = (event) => {
    setSelectedDzongkhag(event.target.value);
  };

  return (
    <div className="filter-con">
      <span className="filter-heading">Search ATM</span>
      <div className="drop-down">
        <select onChange={handleDzongkhagChange}>
          <option disabled selected value="">
            Select one Dzongkhag
          </option>
          {dzongkhags.map((dzongkhag, index) => (
            <option key={index} value={dzongkhag}>
              {dzongkhag}
            </option>
          ))}
        </select>
      </div>
      <div className="table-con">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Google Map</th>
              <th>Location</th>
              <th>Bank Branch</th>
              <th>Phone</th>
              <th>Website</th>
              <th>ATM_ID</th>
            </tr>
          </thead>
          <tbody>
            {atmData.map((atm, index) => (
              <tr>
                <td>
                  <a href="http://www.google.com/maps/place/{atm.lat},{atm.lng}">
                    <img src={google_img} className="map-icon" alt="Map" />
                  </a>
                </td>
                <td>{atm.name}</td>
                <td>{atm.category}</td>
                <td>{atm.phone}</td>
                <td>{atm.website} 3</td>
                <td>{atm.dzongkhag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber) =>
            onPageChange(pageNumber, selectedDzongkhag)
          }
        />
      </div>
    </div>
  );
}
