import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../Contexts";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<any>(() => {
    const userDataFromCookie = Cookies.get("user");
    return userDataFromCookie ? JSON.parse(userDataFromCookie) : null;
  });
  const navigate = useNavigate();

  const hours = 1;
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000);

  const { start, isIdle } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: () => {
      Cookies.remove("user");
      setUser(null);
      navigate("/");
    },
  });

  useEffect(() => {
    if (user && isIdle()) {
      start();
    }
  }, [isIdle, start, user]);

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
