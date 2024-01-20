import React,{useState} from 'react';
import ManagePropertyForm from '../forms/ManagePropertyForm/ManagePropertyForm';
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';

export default function AddProperties () {
    const [error, setError] = useState('');
 
    // Use mutation Hook to get api fetch request
    // The isLoading would be used to disable the button whiles the property is been created
    const {mutate, isLoading} = useMutation(apiClient.addProperty,{
        onSuccess:()=>{
            console.log("Property created");
        },
        onError:(error) =>{
            console.log(error.message);
            setError(err.message);
        }

    });
    const handleSave = (propertyFormData)=>{
        
        mutate(propertyFormData);
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
        
        <h1 className='text-3xl font-semibold text-center my-7'>
          Add a Property
         </h1>
         
        <ManagePropertyForm onSave={handleSave} isLoading={isLoading}/>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
        </main>
    )
}