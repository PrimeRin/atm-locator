export const fetchUser = async () => {
    let url = `http://localhost:8082/user`;


    const token = localStorage.getItem("jwtToken");

    const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
   
    const response = await fetch(url, requestOptions);

    if (response.status === 404) {
        return null;
      }

    const data = await response.json();
      return data;
   };