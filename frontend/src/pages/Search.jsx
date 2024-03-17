import React, {useState} from "react"
import { useQuery } from "react-query"
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import SearchResultCard from "../components/SearchResultCard"
import Pagination from "../components/Pagination"
import SearchBar from '../components/SearchBar';


export default function Search(){
    const search = useSearchContext();
    // pagenum
    const [page, setPage] = useState(1);

    const searchParams = {
        destination: search?.destination,
        checkIn: search.checkIn?.toISOString(),
        checkOut: search.checkOut?.toISOString(),
        adultCount: search.adultCount?.toString(),
        childCount: search.childCount?.toString(),
        bedroom: search.bedroom?.toString(),
        bathroom: search.bathroom?.toString(),
        page:page?.toString()

    }
    
    const {data: propertyData} = useQuery(
        ["searchProperty", searchParams],
        ()=>apiClient.searchProperty(searchParams) );
    
    return (

    <div>
        <div className='flex flex-col gap-6 p-28 px-3  mx-auto bg-slate-300'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          stay
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Signature Properties is the best place to find your next perfect short term stay.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
   
      </div>
      <div className='container mx-auto'>
             
             <SearchBar/>

        </div>
  
      <div className="p-3 mx-auto max-w-5xl gap-5">
    
  
      <div className="flex flex-col gap-5">
              <div className="flex justify-between item-center">
                <span className="text-xl font-bold">
                    {propertyData?.pagination.totalDocument} Properties Found
                    {search.destination ? ` in ${search.destination}`: '' }
                </span>
      
              </div>
          
            {propertyData?.data.map((property)=>(
              
                <SearchResultCard key={property._id} property={property}/>
            ))}
           
            
        </div> 
          <div className="mt-2">
        
                <Pagination
                 page={propertyData?.pagination.page || 1}
                 pages={propertyData?.pagination.pages || 1} 
                 onPageChange={(page) => setPage(page)}/>
            </div>

      </div>
  
      </div>
    )
}