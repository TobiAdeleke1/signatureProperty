import React, {useState} from 'react';
import PropertyItem from '../components/PropertyItem';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';


export default function Properties (){
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
        // <main className='p-3 max-w-lg mx-auto'></main>
        <main className='p-3 mx-auto max-w-2xl'>
            <h1 className='text-3xl font-semibold text-center border-b p-3 text-slate-700 mt-5'>
                Properties
            </h1>

            <div className='flex flex-wrap gap-8'>
                {propertyData.map((property)=>( 
                    <PropertyItem key={property._id} property={property} />

            ))}
        
            </div>
           
            {error && <p className='text-red-500 mt-5'>{error}</p>}
           
           
        </main>

    )
}