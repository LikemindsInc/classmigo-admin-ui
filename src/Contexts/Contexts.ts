import { createContext } from "react";

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);
