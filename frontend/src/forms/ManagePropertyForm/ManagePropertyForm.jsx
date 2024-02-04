import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './DetailSections';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImagesSection from './ImagesSection';


export default function ManagePropertyForm({onSave, isLoading, property}){
    const formMethods = useForm(); 
    const { handleSubmit , reset} = formMethods; 
    
    useEffect(() =>{
        reset(property); 
    }, [property, reset ]);
    let buttonName = "Create Property";
    if(property){ // for use by the Edit
        
        buttonName = "Update Property";
      };

    const onSubmit = handleSubmit((jsonFormData) => {

          const formData = new FormData();
          if(property){ // for use by the Edit
            formData.append("propertyId", property._id);
          };

          formData.append("name", jsonFormData.name);
          formData.append("address", jsonFormData.address);
          formData.append("description", jsonFormData.description);
          formData.append("type", jsonFormData.type);

          // NOTE: form only allows strings, so need to cast number inputs
          formData.append("pricePerNight", jsonFormData.pricePerNight);
          formData.append("adultCount", jsonFormData.adultCount);
          formData.append("childCount", jsonFormData.childCount);
          formData.append("bathroom", jsonFormData.bathroom);
          formData.append("bedroom", jsonFormData.bedroom);
          formData.append("starRating", jsonFormData.starRating);

          // Adding the array items with a loop, with access to array index
          jsonFormData.facilities.forEach((facility, index)=>{
                formData.append(`facilities[${index}]`, facility);
          })

          // For use by eixit property, add so the Backend is properly updated with most updated
          if(jsonFormData.imageUrls){
            jsonFormData.imageUrls.forEach((url, index)=>{
                 formData.append(`imageUrls[${index}]`,url);
            })

          }
          
          // The imageUrls is of form FileList, so need to create an array from it
          // in order to get access to the .forEach method for parsing 
          Array.from(jsonFormData.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile);
          })
         
          onSave(formData); // datapassed to prop function
    });
    return (

        // use a form provider to handle multipart form children
        <FormProvider {...formMethods}> 
        <form className='flex flex-col gap-4 sm:flex-row' onSubmit={onSubmit}>
            <div className='flex flex-col gap-4 flex-1'>
             <DetailSection />
             <TypeSection /> 
             <FacilitiesSection />
             <GuestSection />
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <ImagesSection />
                <button 
                disabled={isLoading}
                type="submit"
                className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                 {isLoading ? "Saving...": buttonName}

                </button>
            </div>
             
         </form>

        </FormProvider>
     );
}