export const authenticate = async (user_name, password) => {
   const backend = process.env.REACT_APP_BACKEND_URL;
   let url = `${backend}/user?user_name=${user_name}&password=${password}`;
   const response = await fetch(url);
   const data = await response.json();
   return data;
};