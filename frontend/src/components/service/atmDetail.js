export const fetchAtmDetails = async (id) => {
    let url = `http://localhost:8082/admin-atm-list/${id}`;
   
    const response = await fetch(url);
    const data = await response.json();
    return data;
   };
   