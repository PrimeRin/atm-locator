export const queryAtmData = async (page, dzongkhag) => {
   let url;
   if (dzongkhag){
      url = `http://localhost:8082/query_atm?page=${page}&dzongkhag=${dzongkhag}`;
   }
   else{
      url = `http://localhost:8082/query_atm?page=${page}`;
   }
   const response = await fetch(url);
   const data = await response.json();
   return data;
  };
  