import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './DetailSections';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImagesSection from './ImagesSection';

export default function ManagePropertyForm(){
    const formMethods = useForm(); // Using form hook
    const { handleSubmit } = formMethods; // deconstructed from fromMethods

    const onSubmit = handleSubmit((formData) => {
          console.log(formData);
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
                <button type="submit" className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                 Create Property 
                 </button>
            </div>
             
         </form>

        </FormProvider>
      
        
     );
}