export const updateAtm = async (atmId, formData) => {
    const url = `http://localhost:8082/update-atm/${atmId}`;
  
    const token = localStorage.getItem("jwtToken");
  
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };
  
    const response = await fetch(url, requestOptions);
    return response;
  };
  