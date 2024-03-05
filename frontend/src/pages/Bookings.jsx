import React, {useEffect,  useState } from 'react';
import { useQuery } from 'react-query';
import * as apiClient from "../api-client";
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';


export default function Bookings () {
    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { propertyId } = useParams();

    // Calculate and set number of nights booked
    const [numberOfNights, setNumberOfNights] = useState(0);

    
    // To add prepopulated fields and reruns when updated
    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            // absolute difference in booking (ms) => to days
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime())/(1000*60*60*24);  
            setNumberOfNights(Math.ceil(nights));
          
        }

    }, [search.checkIn, search.checkOut]);


    const {data: paymentIntentData } = useQuery(
        "createPaymentIntent",
        () => apiClient.createPaymentIntent(propertyId, numberOfNights.toString()),
        { // tells the request to only be made if below conditions are met
            enabled: !!propertyId && numberOfNights>0,
        }
    );


    const { data: property } = useQuery(
        "fetchPropertyById",
        () => apiClient.getPropertyById(propertyId),
        {
            enabled: !!propertyId,
        }
    );

    const { data: currentUser } = useQuery(
        "fetchCurrentUser",
         apiClient.getCurrentUser
        );

    // Prevents undefined for when property has not been fully loaded yet
    if(!property){
        return <></>;
    }

    // options={{
    //     clientSecret:paymentIntentData.clientSecret,
    // }}

    return (
        <div className="grid md:grid-cols-[1fr_2fr] p-3">
           <BookingDetailsSummary 
             checkIn={search.checkIn} 
             checkOut={search.checkOut}
             adultCount={search.adultCount}
             childCount={search.childCount}
             numberOfNights={numberOfNights}
             property={property}

           />
           
           {currentUser && paymentIntentData && (
                <Elements 
                    stripe={stripePromise}
                    options={{
                        clientSecret:paymentIntentData.clientSecret,
                    }}
                >
                    
                    <BookingForm 
                    currentUser={currentUser}
                    paymentIntent={paymentIntentData}
                    />
                
                </Elements>
            )}
            
        </div>
    );
}