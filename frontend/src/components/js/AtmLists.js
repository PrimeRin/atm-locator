import React from "react";
import "../css/AtmLists.css";
import AtmList from "./AtmList";
import { useNavigate } from "react-router-dom";

export default function AtmLists({data, hasMore, elementRef}) {
  const navigate = useNavigate();

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
