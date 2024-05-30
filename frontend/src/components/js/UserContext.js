import React, { createContext, useState, useEffect } from "react";
import { fetchUser } from "../service/user";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function handleFetchUser() {
      try {
        const result = await fetchUser();
        setUser(result);
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    }

    handleFetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};