import React, { useContext, useState } from "react";

const SearchContext = React.createContext();

export const SearchContextProvider = ({children}) =>{
    // use sessionstorage for users previous state else default
    const [destination, setDestination] = useState(
        () => sessionStorage.getItem("destination") || ""
    );
    const [checkIn, setCheckIn] = useState(
        new Date( sessionStorage.getItem("checkIn") || new Date().toISOString()
    ));
    const [checkOut, setCheckOut] = useState(
        new Date( sessionStorage.getItem("checkOut") || new Date().toISOString()
    ));
    const [adultCount, setAdultCount] = useState(() => 
        parseInt(sessionStorage.getItem("adultCount") || 1
    ));
    const [childCount, setChildCount] = useState(() => 
        parseInt(sessionStorage.getItem("childCount") || 1
    ));
    const [bedroom, setBedroom] = useState(() => 
        parseInt(sessionStorage.getItem("bedroom") || 1
    ));
    const [bathroom, setBathroom] = useState(() => 
        parseInt(sessionStorage.getItem("bathroom") || 1
    ));
    const [propertyId, setPropertyId] = useState(
        () => sessionStorage.getItem("propertyId") || ""
    );
    
    const saveSearchValues = (
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        bedroom,
        bathroom,
        propertyId
    ) =>{
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        setBedroom(bedroom);
        setBathroom(bathroom);
        if(propertyId){
            setPropertyId(propertyId);
        }
        
        // Store values to session as well
        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn?.toISOString());
        sessionStorage.setItem("checkOut", checkOut?.toISOString());
        sessionStorage.setItem("adultCount", adultCount?.toString());
        sessionStorage.setItem("childCount", childCount?.toString());
        sessionStorage.setItem("bedroom", bedroom?.toString());
        sessionStorage.setItem("bathroom", bathroom?.toString());

        if(propertyId){
            sessionStorage.setItem("propertyId",propertyId);
        }

    };

    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            bedroom,
            bathroom,
            propertyId,
            saveSearchValues
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () =>{
    const context = useContext(SearchContext);
    return context;
};