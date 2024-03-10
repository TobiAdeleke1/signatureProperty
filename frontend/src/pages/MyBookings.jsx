import React from 'react';
import * as apiClient from '../api-client';
import { useQuery } from 'react-query';

export default function MyBooking () {
    const {data:properties} = useQuery(
        "fetchMyBookings",
        apiClient.fetchMyBooking
    );
    
    if(!properties || properties.length === 0){
        return (
            <div className='p-7'>
                 <p className='text-xl text-slate-700 text-center'> No Booking Found </p>
            </div>
           
        )
    }

    return (
        <div className='space-y-5'>
            <h1  className='text-3xl font-semibold text-center my-7'> My Bookings</h1>
            {properties.map((property)=>(
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'>
                    <div className='lg:w-full lg:h-[250px]'> 
                       <img 
                       src={property.imageUrls[0]}
                       className='w-full h-full object-cover object-center'
                       />

                    </div>

                    <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
                        <div className="text-2xl font-bold">
                          {property.name}
                          <div className='text-xs font-normal'>
                            {property.address}

                          </div>

                        </div>
                        
                       {property.bookings.map((booking)=>(
                         <div>
                            <div>
                                <span className='font-bold mr-2'> Dates: </span>
                                <span>
                                    {new Date(booking.checkIn).toDateString()} -
                                    {new Date(booking.checkOut).toDateString()}
                                </span>
                            </div>

                            <div>
                                <span className='font-bold mr-2'> Guests </span>
                                <span>
                                    {booking.adultCount} adults, {booking.childCount} children 
                                </span>
                            </div>
                         </div>
                    ))}
                    </div>

                </div>
            ))
            }
        </div>
    )
}