import React, {useState} from 'react';
import PropertyItem from '../components/PropertyItem';
import SearchBar from '../components/SearchBar';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

export default function Home () {
    const [error, setError] = useState('');
    const { data:propertyData } = useQuery("getProperties", apiClient.getProperties,{
        onError:(err) =>{
            console.log(err.message);
            setError(err.message);
        }
    });

    if(!propertyData){
        return (
            <div className='p-7'>
                 <p className='text-xl text-slate-700 text-center'> No Available Property </p>
            </div>
           
        )
    }

    return (
        <div>
            {/* TODO: add an herocard */}
        {/* <div className='flex flex-col gap-6 p-28 px-3  mx-auto bg-slate-300'> */}
        <div className='flex flex-col gap-6 p-28 px-3  mx-auto bg-coffee-dark'>
        {/* <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          stay
        </h1> */}
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next stay with <br />
            <span className='text-slate-500'>Solomon Property </span>
          

        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
         find your next perfect short term stay.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
   
      </div>
            
            <div className='container mx-auto'>
             
             {/* <SearchBar/> */}

            </div>
  
            <div className='p-3 mx-auto max-w-5xl'>
            <div className='flex flex-wrap gap-8'>
                {propertyData.map((property)=>( 
                    <PropertyItem key={property._id} property={property} />

            ))}
        
            </div>
           
            {error && <p className='text-red-500 mt-5'>{error}</p>}
           
           
           </div>
        </div>
    )
}