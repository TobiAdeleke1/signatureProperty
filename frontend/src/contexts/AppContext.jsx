import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";


const AppContext = React.createContext();

export const AppContextProvider = ({children})=>{

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry:false,
    });
    // const isLoggedIn = !isError; // when there is now error validation was fine.
    
    return (<AppContext.Provider value={{isLoggedIn:!isError }}>
        {children}
    </AppContext.Provider>   
  );
};

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context;
};