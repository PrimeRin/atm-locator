export const fetchAtmDetails = async (id) => {
    let url = `http://localhost:8082/admin-atm-list/${id}`;


    const token = localStorage.getItem("jwtToken");

    const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
   
    const response = await fetch(url, requestOptions);
    return response.json();
   };
   