export const queryAtmData = async (page, dzongkhag, search, filter) => {
  let url = `http://localhost:8082/query_atm?page=${page}`;

  if (dzongkhag) {
    url += `&dzongkhag=${dzongkhag}`;
  }
  if (search) {
    url += `&search=${search}`;
  }
  if (filter && filter.length > 0) {
    url += `&filter=${filter.join(',')}`;
  }

  const token = localStorage.getItem('jwtToken');

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data;
};
