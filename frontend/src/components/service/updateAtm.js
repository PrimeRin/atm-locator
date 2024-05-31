export const updateAtm = async (atmId, formData) => {
  const backend = process.env.REACT_APP_BACKEND_URL;
    const url = `${backend}/update-atm/${atmId}`;
  
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
  