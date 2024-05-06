export const authenticate = async (user_name, password) => {
   let url = `http://localhost:8082/user?user_name=${user_name}&password=${password}`;
   const response = await fetch(url);
   const data = await response.json();
   return data;
};