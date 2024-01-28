import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ImagesSection (){
    const { register,  formState:{errors} } = useFormContext();

    return (
        <div>
            <h2 className='text-2xl font-semibold mb-3'> Images:
                <p className='font-normal text-sm text-gray-600'> The first image will be the cover (max 6)</p>
            </h2>
            <div className='flex gap-4'>
                <input className='p-3 border border-gray-300 rounded w-full'
                    type='file' 
                    accept='image/*'
                    multiple
                    {...register('imageFiles', {
                        validate:(imageFiles) =>{
                            const totalLength = imageFiles.length;

                            if(totalLength === 0){
                                return "Include at least one image";
                            }
                            if(totalLength > 6){
                                return "No more than 6 images allowed";
                            }
                            return true;
                        }
                    })}
                />
                {/* <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'> Upload</button> */}

            </div>
            {errors.imageFiles && (
                <span className='text-red-500'>
                 {errors.imageFiles.message }
                </span>
            )}
           
        </div>
    );

}