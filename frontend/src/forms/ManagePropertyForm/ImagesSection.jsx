import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ImagesSection (){
    const { 
        register, 
        formState:{errors},
        watch,
        setValue,
        } = useFormContext();
    
    const existingImageUrls = watch("imageUrls");
    const handleImageDelete = (event, imageUrl) =>{
        event.preventDefault(); // To overide auto submission of forms
        setValue("imageUrls", 
        existingImageUrls.filter((url)=> url !== imageUrl)); // Filter to return the only the rest of the url

    };
    
    return (
        <div>
            <h2 className='text-2xl font-semibold mb-3'> Images:
                <p className='font-normal text-sm text-gray-600'> The first image will be the cover (max 6)</p>
            </h2>
            <div>
                {existingImageUrls && (
                    <div className='flex-col justify-between p-3 border items-center'> 
                      {existingImageUrls.map((imageUrl) => (
                        
                           <div key={imageUrl} className='relative group' >
                           <img 
                             alt='Property image'
                             src={imageUrl}
                             className='min-w-full h-25 object-contain mb-2 rounded-lg'
                              />
                           <button onClick={(event) => handleImageDelete(event, imageUrl)}  // using a function, so the function is only called on clicked rather than executed automatically
                            className='absolute inset-0 item-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'>
                             Delete
                             </button>
                           </div>
                      ))}
                    </div>
                )}
            
                <input className='p-3 border border-gray-300 rounded w-full'
                    type='file' 
                    accept='image/*'
                    multiple
                    {...register('imageFiles', {
                        validate:(imageFiles) =>{
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

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


            </div>
            {errors.imageFiles && (
                <span className='text-red-500'>
                 {errors.imageFiles.message }
                </span>
            )}
           
        </div>
    );

}