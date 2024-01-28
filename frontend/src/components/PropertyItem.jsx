import React from 'react';
import { Link } from 'react-router-dom'; 
import { MdLocationOn } from 'react-icons/md';
// import { useAppContext } from '../contexts/AppContext';

export default function PropertyItem({property}){
    // const {isLoggedIn} = useAppContext();

    return (
        // <div className='flex flex-col gap-4'>
        // <div className='flex flex-col'>
        // <div className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'></div>
            <div className='flex flex-row justify-between border bg-white rounded-lg p-4 gap-4 overflow-hidden'>
            <div className='flex flex-col gap-4 flex-1'>
            {/* <Link to={'/edit'}> */}
                <Link to={`/property/${property._id}`}>
                <img src={property.imageUrls[0]} alt='property-cover' className='h-[300px] sm:h[200px] w-full object-cover hover:scale-105 transition-scale duration-300 '/>
                </Link>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <h2 className='truncate text-2xl font-semibold text-slate-700'>{property.name}</h2>
                <div className='flex flex-col gap-2'>
                        <div className=' border-slate-300 rounded-sm gap-1 flex items-center'>
                        <MdLocationOn className='h-4 w-4 text-green' />
                        <p className='text-gray-600 text-sm truncate'>{property.address}</p>
                            
                        </div>
                    <div className='flex flex-col  gap-2 whitespace-pre-line'>
                    {property.description.length >200 ? property.description.slice(0,200) +' ...': property.description }

                    <p className='font-semibold text-slate-500 mt-1'>
                        £{property.pricePerNight} / Night
                    </p>
                   

                    </div>
                     <div className='text-slate-700 flex gap-8'>
                        <div className='font-semibold text-sm'>
                            {property.bedroom > 1? `${property.bedroom} beds`: `${property.bedroom} bed` }
                            
                        </div>
                        <div className='font-semibold text-sm'>
                            {property.bathroom > 1? `${property.bathroom} baths`: `${property.bathroom} bath` }
                            
                        </div>

                    </div>


                   
                </div>
            
            </div>
              
               
               
                 

            {/* </div> */}
          
             {/* add parts to only allow edits if is logged in */}
            {/* {isLoggedIn && 
            <>

            </>} */}
        </div>

    )
}