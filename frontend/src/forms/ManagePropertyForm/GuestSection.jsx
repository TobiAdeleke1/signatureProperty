import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function GuestSection (){
    const { register, formState: {errors} } = useFormContext();
    return(
        <div>
            <h2 className="text-2xl font-semibold mb-3">Guests</h2>
            <div className='grid grid-cols-2 p-6 gap-5 bg-slate-300'>
                <label className='text-sm  gap-2 font-semibold text-gray-700'>
                    Adults
                    <input
                    type='number' 
                    min={1}
                    className='border p-3 rounded-lg w-full font-normal focus:outline-none '
                    id='adultCount' {...register("adultCount", {required: "This field is required"})}/>
                    {errors.adultCount && (
                        <span className='text-red-500'> {errors.adultCount.message }</span>
                    ) }
                    
                </label>

                <label className='text-sm gap-2 font-semibold text-gray-700'>
                    Children
                    <input
                    type='number' 
                    min={0}
                    className='border p-3 rounded-lg w-full font-normal focus:outline-none '
                    id='childCount' {...register("childCount", {required: "This field is required"})}/>
                    {errors.childCount && (
                        <span className='text-red-500'> {errors.childCount.message }</span>
                    ) }
                
                </label>
            </div>
        </div>

    );
}