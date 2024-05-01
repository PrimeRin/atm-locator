import React, { useState } from "react";
import "../css/FilterAtm.css";
import { dzongkhags } from "./dzongkhags_list";
import Pagination from "./Pagination";

export default function FilterAtm() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="filter-con">
      <span className="filter-heading">Search ATM</span>
      <div className="drop-down">
        <select>
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
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
