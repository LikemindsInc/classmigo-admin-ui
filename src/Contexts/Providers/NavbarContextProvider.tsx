import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavbarContext } from "../Contexts";
import { formatUrlName } from "../../utils/utilFns";

interface NavbarContextProviderProps {
  children: React.ReactNode;
}

export const NavbarContextProvider = ({
  children,
}: NavbarContextProviderProps) => {
  const [title, setTitle] = useState<any>("");
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  useEffect(() => {
    setTitle(formatUrlName(pathnames[0]));
  }, [pathnames]);

  return (
    <NavbarContext.Provider value={{ title, setTitle }}>
      {children}
    </NavbarContext.Provider>
  );
};
