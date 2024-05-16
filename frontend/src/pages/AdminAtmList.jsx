import AdminLayout from "../components/layout/AdminLayout";
import AtmLists from "../components/js/AtmLists";
import SearchBar from "../components/js/SearchBar";
import Filter from "../components/js/Filter";
import "../components/css/AtmList.css";
import "../components/css/AtmLists.css";
import { queryAtmData } from "../components/service/queryAtmData";
import { useState, useEffect, useRef } from "react";

function AdminAtmList() {
  const [searchText, setSearchText] = useState(null);
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);

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
  }, [data, searchText, filter]);

  useEffect(() => {
    setCurrentPage(1);
    fetchMoreItems();
  }, [searchText, filter]); 

  async function fetchMoreItems() {
    const data = await queryAtmData(currentPage, null, searchText, filter);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setData((prevData) => [...prevData, ...data]);
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  }

  function onSearch(text){
    setSearchText(text);
  }

  function onFilterChange(selectedFilters) {
    setFilter(selectedFilters);
  }

  return (
    <AdminLayout>
      <div className="admin-atm-list-con">
        <SearchBar onSearch={onSearch}/>
        <div className="admin-atm-inner-con">
          <Filter onFilterChange={onFilterChange} />
          <AtmLists data={data} hasMore={hasMore} elementRef={elementRef} />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmList;
