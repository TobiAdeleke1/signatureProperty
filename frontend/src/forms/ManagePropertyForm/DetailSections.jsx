import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function DetailSection (){
    const { register, formState: {errors} } = useFormContext();
    return ( 
    <div className='flex flex-col gap-4 flex-1'>
        <label className='text-slate-700 text-sm font-bold'>
        Name
            <input type='name' className='border p-3 rounded-lg w-full focus:outline-none font-semibold' maxLength='65' minLength='10'
            id='name' {...register("name", {required: "This field is required"})}/>
            {errors.name && (
                <span className='text-red-500'> {errors.name.message }</span>
            ) }
        </label>

       
        <label className='text-slate-700 text-sm font-bold'>
        Description
            <textarea 
            rows={6}
            type='textarea' className='border p-3 rounded-lg w-full focus:outline-none font-semibold'
            id='description' {...register("description", {required: "This field is required"})}> 
            </textarea>

            {errors.description && (
                <span className='text-red-500'> {errors.description.message }</span>
            ) }
            </label>

        <label className='text-slate-700 text-sm font-bold'>
        Address
            <input type='text' className='border p-3 rounded-lg w-full focus:outline-none font-semibold'
            id='address' {...register("address", {required: "This field is required"})}/>
            {errors.address && (
                <span className='text-red-500'> {errors.address.message }</span>
            ) }
        </label>
      

            
      
        <div className='flex gap-4'>
        <label className='text-slate-700 text-sm font-bold  flex-1'>
        Price Per Night
            <input
            type='number' 
            min={1}
            className='border p-3 rounded-lg w-full focus:outline-none font-semibold '
            id='pricePerNight' {...register("pricePerNight", {required: "This field is required"})}/>
            {errors.pricePerNight && (
                <span className='text-red-500'> {errors.pricePerNight.message }</span>
            ) }
        </label>

        <label className='text-slate-700 text-sm font-bold flex-1'>
        Star Rating
            
            <select {...register("starRating",{
                required: "This field is required"
            })} className='border p-3 rounded-lg w-full'>
            
                <option value="" className=''>
                    Select as Rating
                </option>
                {[1,2,3,4,5].map((num) =>(
                    <option key={num} value={num}> {num} </option>
                ))}
            </select>
            {errors.starRating && (
                <span className='text-red-500'> {errors.starRating.message }</span>
            ) }
        </label>
        </div>

    </div>

    );
}

