import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/AtmLists.css";
import AtmList from "./AtmList";
import { queryAtmData } from "../service/queryAtmData";
import { useNavigate } from "react-router-dom";

export default function AtmLists() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const navigate = useNavigate();

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data]);

  async function fetchMoreItems() {
    const data = await queryAtmData(currentPage);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setData((prevData) => [...prevData, ...data]);
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  }

  const handleOnClick = (atm) => {
    navigate(`/admin-atm-list/${atm.id}`);
  };

  return (
    <div className="atm-list-card">
      <div className="atmlists-con">
        {data.map((atm) => (
          <AtmList key={atm.id} atm={atm} onSelect={handleOnClick} />
        ))}
        {hasMore && <div ref={elementRef}>Load more...</div>}
      </div>
    </div>
  );
}
