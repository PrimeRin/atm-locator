export const queryAtmData = async (page, dzongkhag) => {
   let url;
   if (dzongkhag) {
     url = `http://localhost:8082/query_atm?page=${page}&dzongkhag=${dzongkhag}`;
   } else {
     url = `http://localhost:8082/query_atm?page=${page}`;
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
 