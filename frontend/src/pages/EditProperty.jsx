import React from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm";

export default function EditProperty(){
    const navigate = useNavigate();
    const { propertyId } = useParams(); // use hook from react-query
    const { data:property} = useQuery(
              "getPropertById", 
               () => apiClient.getPropertyById(propertyId), // Awesome function expresion
               { 
                onError:(err) =>{
                    console.log(err.message);
                },
                 enabled: !!propertyId // tells query to only run if this value exists
               }
        );

        const { mutate, isLoading } = useMutation(apiClient.updatePropertyById,{
            onSuccess: () => {
                navigate("/all-properties");
            },
            onError: () =>{
                console.log(error.message);
            }
        
        });

        const handleSave = (propertyFormData) => {
            mutate(propertyFormData);

        }
 
    return (
        <main className='p-3 max-w-4xl mx-auto'>
        
        <h1 className='text-3xl font-semibold text-center my-7'>
          Edit Property
         </h1>
         
         <ManagePropertyForm onSave={handleSave} isLoading={isLoading} property={property} />
      
        </main>
        

    )
}