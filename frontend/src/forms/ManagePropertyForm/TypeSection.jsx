import React from 'react';
import { useFormContext } from "react-hook-form";
import { propertyType } from "../../config/property_type_options";

export default function TypeSection (){
    // use watch from form context to get selected type
    const { register, watch, formState:{errors} } = useFormContext();
    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Type</h2>
            <div className="grid grid-cols-3 gap-2">
                {propertyType.map((type) =>(
                    <label className={
                        typeWatch === type
                        ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                        : "cursor-pointer bg-slate-300 text-sm rounded-full px-4 py-2 font-semibold"
                    }>
                        <input type="radio" value={type} {...register("type", {
                            required: "This field is required",   
                        })} className='hidden'/>
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className='text-red-500 test-sm font-bold'>
                {errors.type.message}
                </span>
            )}
        </div>
    )

}