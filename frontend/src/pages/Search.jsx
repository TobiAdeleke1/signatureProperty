import React, {useState} from "react"
import { useQuery } from "react-query"
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import SearchResultCard from "../components/SearchResultCard"
import Pagination from "../components/Pagination"

export default function Search(){
    const search = useSearchContext();
    // pagenum
    const [page, setPage] = useState(1);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        bedroom: search.bedroom.toString(),
        bathroom: search.bathroom.toString(),
        page:page.toString()

    }
    
    const {data: propertyData} = useQuery(
        ["searchProperty", searchParams],
        ()=>apiClient.searchProperty(searchParams) );
    console.log(search)

    // use sticky css to stop filter from moving on the page
    // Understanding the difference between the grid (enables stacking on smaller screen) and flex
    return (
      <div className="grid grid-cols-1 justify-center lg:grid-cols-[250px_1fr] gap-5">
        
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5"> 
               Filter by:
            </h3>
             {/* TODO FILTERS  */}
        </div>

        


      </div>
      <div className="flex flex-col gap-5">
            <div className="flex justify-between item-center">
             <span className="text-xl font-bold">
                {propertyData?.pagination.totalDocument} Properties Found
                {search.destination ? ` in ${search.destination}`: '' }
             </span>
             {/* TODO: SORT options */}

            </div>
            {/* TODO: Build the searchcomponent */}
            {propertyData?.data.map((property)=>(
              
                <SearchResultCard property={property}/>
            ))}
           
            <div>
        
                <Pagination
                 page={propertyData?.pagination.page || 1}
                 pages={propertyData?.pagination.pages || 1} 
                 onPageChange={(page) => setPage(page)}/>
            </div>
        </div> 
          

      </div>
    )
}