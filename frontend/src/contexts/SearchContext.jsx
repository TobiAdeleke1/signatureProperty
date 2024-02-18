import React, { useContext, useState } from "react";

const SearchContext = React.createContext();

export const SearchContextProvider = ({children}) =>{
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [bedroom, setBedroom] = useState(1);
    const [bathroom, setBathroom] = useState(1);
    const [propertyId, setPropertyId] = useState("");
    
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