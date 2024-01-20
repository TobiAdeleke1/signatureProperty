import React from 'react';
import { propertyFacilities } from '../../config/property_type_options';
import { useFormContext } from 'react-hook-form';

export default function FacilitiesSection (){
    const {register, formState: {errors}} = useFormContext();
    return (
        <div>
             <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
             <div className='grid grid-cols-3 gap-3 '>
                {propertyFacilities.map((facilities)=>(
                
                    <label key={facilities} className='text-sm flex gap-2 text-gray-700'>
                        <input className='w-4'
                            type="checkbox"
                            value={facilities} {...register("facilities",{
                                validate: (facilities) =>{
                                    if(facilities && facilities.length >0){
                                        return true;
                                    }else{
                                        return "At least one facility is required";
                                    }

                                }
                            })}
                        />
                        {facilities}
                    </label>
                ))}
             </div>
             {errors.facilities && (
                <span className='text-red-500 test-sm font-bold'>
                {errors.facilities.message}
                </span>
             )}

            <div className='py-3'>
                <div className='flex items-center gap-2'>
                <label className='text-sm flex gap-2  text-gray-700'>
               
                    <input
                    type='number' 
                    min={1}
                    className='border p-3 rounded-lg max-w-[50%] focus:outline-none '
                    id='bedroom' {...register("bedroom", {required: "This field is required"})}/>
                    {errors.bedroom && (
                        <span className='text-red-500'> {errors.bedroom.message }</span>
                    ) }
                    <p className='py-3 font-semibold'>Bedrooms </p>
                </label>

                <label className='text-sm flex gap-2 text-gray-700'>
                  
                    <input
                    type='number' 
                    min={1}
                    className='border p-3 rounded-lg max-w-[50%] focus:outline-none '
                    id='bathroom' {...register("bathroom", {required: "This field is required"})}/>
                    {errors.bathroom && (
                        <span className='text-red-500'> {errors.bathroom.message }</span>
                    ) }
                    <p className='py-3 font-semibold'>Bathrooms </p>
                </label>
                </div>
             </div>
        </div>
    )

}