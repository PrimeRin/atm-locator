import React from "react";
import { useState, useEffect } from "react";
import "../css/AtmLists.css";
import AtmList from "./AtmList";
import Pagination from "./Pagination";
import { queryAtmData } from "../service/queryAtmData";
import { useNavigate } from 'react-router-dom';

export default function AtmLists() {
  const [atmData, setAtmData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const navigate = useNavigate();

  const onPageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const data = await queryAtmData(pageNumber);
    setAtmData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryAtmData(currentPage);
      setAtmData(data);
    };
    fetchData();
  }, [currentPage]);

  const handleOnClick = (atm) => {
    navigate(`/atm/${atm.id}`);
  };

  return (
    <div className="atm-list-card">
      <div className="atmlists-con">
        {atmData.map((atm) => (
          <AtmList key={atm.id} atm={atm} onSelect={handleOnClick}/>
        ))}
      </div>
      <div>
        <div className="pagination">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}
