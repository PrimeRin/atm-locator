export const atmList = async (page, dzongkhag) => {
    let url;
    if (dzongkhag) {
      url = `http://localhost:8082/atm_list?page=${page}&dzongkhag=${dzongkhag}`;
    } else {
      url = `http://localhost:8082/atm_list?page=${page}`;
    }
  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  