import React from "react";
import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom";


export default function SearchResultCard({property}){
    // New Learning: Component with pop
    //cursor-pointer allows text to redirect to new pages
    // Use tailwinds line-clamp-4 for automatic truncation
    
    return (
        <div className="grid grid-col-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img
                 src={property.imageUrls[0]}
                 className= "w-full h-full object-cover object-center"
                 />

            </div>
            <div className="grid grid-rows-[1fr_1fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: property.starRating }).map(() =>(
                                <AiFillStar className="fill-yellow-400"/>
                            ))}

                        </span>

                        <span className="ml-1 text-sm">
                            {property.type}
                        </span>
                    </div>
                    <Link to={`/detail/${property._id}`} className="text-2xl font-bold cursor-pointer"> 
                        {property.name}
                    </Link>

                </div>
                <div className="line-clamp-4">
                    {property.description}
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                        <div className="flex gap-1 items-center">
                                {property.facilities.slice(0,3).map(((facility)=>(
                                        <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                            {facility}
                                        </span>
                                       
                                )))}
                                <span className="text-sm">
                                    {property.facilities.length > 3 && `+ ${property.facilities.length -3} more`}
                                </span>


                        </div>
                        <div className="flex flex-col items-end gap-1">
                                <span className="font-bold">
                                    £{property.pricePerNight} per Night
                                </span> 
                                <Link to={`/detail/${property._id}`} className="bg-slate-700 text-white h-full p-2 font-bold text-xl max-w-fit hover:opacity-80">
                                    View More
                                </Link>
                        </div>
                </div>
            </div>

        </div>
    )
}