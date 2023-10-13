import { useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../Contexts";

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<any>(() => {
    const userDataFromCookie = Cookies.get("user");
    return userDataFromCookie ? JSON.parse(userDataFromCookie) : null;
  });

  const hours = 1; 
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000); 

  const handleSetUser = (userData: any) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: expirationDate });
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};
