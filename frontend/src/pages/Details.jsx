import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";


export default function Details() {
    const { propertyId} = useParams();
    const {data:property} = useQuery(
        "fetchPropertyById",
        () => apiClient.getCurrentPropertyById(propertyId || ""),
        {enabled: !!propertyId} // prevent request unless the id is present
    );
    // Add conditions to take care of delay in response from the database
    // instead of errors 
    if(!property){
       return <></>
    }
    // Using grid to b e able to stack the property details in rows

    return (
        <div className="space-y-6 mt-4 p-3">
            <div>
                <span className="flex">
                 {Array.from({length : property.starRating }).map(() =>(
                    <AiFillStar className="fill-yellow-400"/>
                 ))}
                </span>
                <h1 className="text-3xl font-bond">
                    {property.name}
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {property.imageUrls.map((image)=>(
                        <div className="h-[300px]">
                            <img 
                            src={image}
                            alt={property.name}
                            className="rounded-md w-full h-full object-cover object-center"
                            />

                        </div>
                    ))}

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                    {property.facilities.map((facility) =>(
                        <div className="border border-slate-300 rounded-sm p-3"> 
                            {facility}
                        </div>
                    ))}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line"> 
                    {property.description}
                </div>      
                <div className="h-fit">
                    <GuestInfoForm 
                      propertyId={property._id}
                      pricePerNight={property.pricePerNight}
                       />
                </div>  

            </div>
        </div>
    )


}