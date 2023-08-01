import { useState } from "react";
import { ModalContext } from "../Contexts";


interface ModalContextProviderProps {
    children: React.ReactNode;
}


export const ModalContextProvider =({children}:ModalContextProviderProps) => {
    
    const [openModal, setOpenModal] = useState<any>(false)

    return (
        <ModalContext.Provider value={{ openModal, setOpenModal }}>
            {children}
        </ModalContext.Provider>
    )

}