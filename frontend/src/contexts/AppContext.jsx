import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const AppContext = React.createContext();
const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({children})=>{

    const { isError, isLoading } = useQuery("validateToken", apiClient.validateToken, {
        retry:false,
    });    

    const { isLoading:isRoleLoading, data: userAdminRole} = useQuery("userRole", apiClient.getUserRole, {
        retry:false,
    });

    return (<AppContext.Provider 
           value={{
            isLoggedIn:!isError && !isLoading,
            stripePromise:stripePromise,
            isUserAdmin:!isRoleLoading && userAdminRole?.userAdmin
            }}
           >
        {children}
    </AppContext.Provider>   
  );
};

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context;
};