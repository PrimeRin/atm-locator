import React from "react";
import "../css/PageNotFound.css";
import img_404 from "../../assets/img/404.png";

const PageNotFound = () => {
  return (
    <div className="page-not-found-con">
      <img src={img_404} alt="404" className="page-not-found-img" />
      <span className="page-not-found-text">Page Not Found</span>
    </div>
  );
};

export default PageNotFound;
