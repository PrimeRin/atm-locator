export const fetchUser = async () => {
  const cachedUser = localStorage.getItem("user");
  const backend = process.env.REACT_APP_BACKEND_URL;

  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  let url = `${backend}/user`;
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
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
