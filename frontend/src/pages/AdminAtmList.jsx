import AdminLayout from "../components/layout/AdminLayout";
import AtmLists from "../components/js/AtmLists";
import SearchBar from "../components/js/SearchBar";
import Filter from "../components/js/Filter";
import "../components/css/AtmList.css";
import "../components/css/AtmLists.css";
import { queryAtmData } from "../components/service/queryAtmData";
import { useState, useEffect, useRef } from "react";

function AdminAtmList() {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const [deletedAtm, setDeletedAtm] = useState(null);

  async function fetchMoreItems() {
    const result = await queryAtmData(currentPage, null, searchText, filter);
    if (result.length === 0) {
      setHasMore(false);
    } else {
      setData((prevData) => [...prevData, ...result]);
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        fetchMoreItems();
      } 
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [data, hasMore]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [searchText, filter]);

  function onSearch(text) {
    setSearchText(text);
  }

  function onFilterChange(selectedFilters) {
    setFilter(selectedFilters);
  }

  const handleDelete = (atmId) => {
    setDeletedAtm(atmId);
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  return (
    <AdminLayout>
      <div className="admin-atm-list-con">
        <SearchBar onSearch={onSearch} searchText={searchText} />
        <div className="admin-atm-inner-con">
          <Filter onFilterChange={onFilterChange} />
          <AtmLists data={data} hasMore={hasMore} elementRef={elementRef} filter={filter} onDelete={handleDelete}/>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmList;
