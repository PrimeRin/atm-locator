export const createAtm = async (formData) => {
  const backend = process.env.REACT_APP_BACKEND_URL;
  const url = `${backend}/create-atm`;

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
