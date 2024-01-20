import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './DetailSections';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImagesSection from './ImagesSection';

// Using props with for

export default function ManagePropertyForm({onSave, isLoading }){
    const formMethods = useForm(); // Using form hook
    const { handleSubmit } = formMethods; // deconstructed from fromMethods

    const onSubmit = handleSubmit((jsonFormData) => {
         // Need to convert the json from the frontend, 
         // to something that can be sent to the backend api
          console.log("jsonFormData: "+jsonFormData);
          const formData = new FormData();
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
                 {isLoading ? "Saving...": " Create Property "}

                </button>
            </div>
             
         </form>

        </FormProvider>
      
        
     );
}