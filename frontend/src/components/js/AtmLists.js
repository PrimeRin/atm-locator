import React from "react";
import "../css/AtmLists.css";
import AtmList from "./AtmList";
import { useNavigate } from "react-router-dom";
import img_404 from "../../assets/img/404.png";

export default function AtmLists({ data, hasMore, elementRef, filter, onDelete}) {
  const navigate = useNavigate();

  const handleOnClick = (atm) => {
    navigate(`/admin-atm-list/${atm.id}`);
  };

  return (
    <div className="atm-list-card">
    {filter.length > 0 && (
      <div className="atmlists-con">
        {data.map((atm) => (
          <AtmList key={atm.id} atm={atm} onSelect={handleOnClick} onDelete={onDelete} />
        ))}
        {hasMore && (
          <div className="load-more" ref={elementRef}>
            ....
          </div>
        )}
      </div>
    )}
    {(filter.length === 0 || data.length === 0) && (
      <div className="no-data">
        <img src={img_404} alt="404" className="no-data-img" />
        <span className="no-atm-found">No ATM Found!</span>
        <span>Seems like we don't have any ATMs in this category.</span>
      </div>
    )}
  </div>
  );
}
