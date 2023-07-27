import { useState } from "react";
import { DrawerContext } from "../Contexts";


interface DrawerContextProviderProps {
    children: React.ReactNode;
}


export const DrawerContextProvider =({children}:DrawerContextProviderProps) => {
    
    const [openDrawer, setOpenDrawer] = useState<any>(false)

    return (
        <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
            {children}
        </DrawerContext.Provider>
    )

}