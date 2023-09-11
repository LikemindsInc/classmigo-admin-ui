import { createContext } from "react";

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

interface NavBarContextProps {
  title: string;
  setTitle: (title: any) => void;
}

interface DrawerContextProps {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

interface ModalContextProps {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

interface LessonCriteriaProps {
  className: {
    label: string | null;
    value: string | null;
  };
  subject: {
    label: string | null;
    value: string | null;
  };
  topic: {
    label: string | null;
    value: string | null;
  };
  setClassName: (value: any) => any;
  setSubject: (value: any) => any;
  setTopic: (value: any) => any;
}

export const UserContext = createContext<UserContextProps | any>({});
export const LessonCriteriaContext = createContext<LessonCriteriaProps | any>(
  null
);
export const DrawerContext = createContext<DrawerContextProps | any>(false);
export const ModalContext = createContext<ModalContextProps | any>(false);
export const NavbarContext = createContext<NavBarContextProps | any>(" ");
