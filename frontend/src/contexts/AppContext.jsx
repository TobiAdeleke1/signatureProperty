import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";


const AppContext = React.createContext();

export const AppContextProvider = ({children})=>{

    const { isError, isLoading } = useQuery("validateToken", apiClient.validateToken, {
        retry:false,
    });    
    return (<AppContext.Provider value={{isLoggedIn:!isError && !isLoading }}>
        {children}
    </AppContext.Provider>   
  );
};

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context;
};