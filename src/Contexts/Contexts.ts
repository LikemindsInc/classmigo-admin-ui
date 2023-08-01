import { createContext } from "react";

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

interface DrawerContextProps{
  openDrawer: boolean
  setOpenDrawer: (open: boolean) => void
}

interface ModalContextProps{
  openDrawer: boolean
  setOpenDrawer: (open: boolean) => void
}


export const UserContext = createContext<UserContextProps | null>(null);
export const DrawerContext = createContext<DrawerContextProps | any>(false);
export const ModalContext = createContext<ModalContextProps | any>(false);


