export const deleteAtm = async (id) => {
    const backend = process.env.REACT_APP_BACKEND_URL;
    const url = `${backend}/atms/${id}`; 
  
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
  