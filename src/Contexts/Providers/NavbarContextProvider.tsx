import { useState } from "react";
import { NavbarContext} from "../Contexts";


interface NavbarContextProviderProps {
    children: React.ReactNode;
}


export const NavbarContextProvider =({children}:NavbarContextProviderProps) => {
    
    const [title, setTitle] = useState<any>("")

    return (
        <NavbarContext.Provider value={{ title, setTitle }}>
            {children}
        </NavbarContext.Provider>
    )

}