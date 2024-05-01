import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 5);
  const endPage = Math.min(totalPages, startPage + 9);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {startPage > 1 && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(startPage - 1)}
        >
          ...
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(endPage + 1)}
        >
          ...
        </button>
      )}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
