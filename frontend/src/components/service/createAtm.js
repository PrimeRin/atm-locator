export const createAtm = async (formData) => {
  const url = `http://localhost:8082/create-atm`;

  const token = localStorage.getItem("jwtToken");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(url, requestOptions);
  return response;
};
