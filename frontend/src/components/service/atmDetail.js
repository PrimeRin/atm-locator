export const fetchAtmDetails = async (id) => {
  const backend = process.env.REACT_APP_BACKEND_URL;
    let url = `${backend}/admin-atm-list/${id}`;


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
   