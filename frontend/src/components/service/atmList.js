export const atmList = async (page, dzongkhag) => {
    const backend = process.env.REACT_APP_BACKEND_URL;
    let url;
    if (dzongkhag) {
      url = `${backend}/atm_list?page=${page}&dzongkhag=${dzongkhag}`;
    } else {
      url = `${backend}/atm_list?page=${page}`;
    }
  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  