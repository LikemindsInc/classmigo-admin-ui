import { useState } from "react";
import { UserContext } from "../Contexts";


interface UserContextProviderProps {
    children: React.ReactNode;
}


export const UserContextProvider =({children}:UserContextProviderProps) => {
    
    const [user, setUser] = useState<any>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}