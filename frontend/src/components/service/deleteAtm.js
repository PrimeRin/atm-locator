export const deleteAtm = async (id) => {
    const url = `http://localhost:8082/atms/${id}`; // Adjusted URL for DELETE operation
  
    const token = localStorage.getItem("jwtToken");
  
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  };
  