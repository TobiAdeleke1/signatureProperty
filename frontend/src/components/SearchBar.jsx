import React, { useState} from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import  DatePicker from 'react-datepicker';
// Use Datepicker default style sheet
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';



export default function SearchBar(){
    const search = useSearchContext();
    // To redirect to nevigate page
    const navigate = useNavigate();


    // Use context to set the initial state values
    const [destination, setDestination] = useState(search.destination);
    const [checkIn, setCheckIn] = useState(search.checkIn);
    const [checkOut, setCheckOut] = useState(search.checkOut);
    const [adultCount, setAdultCount] = useState(search.adultCount);
    const [childCount, setChildCount] = useState(search.childCount);
    const [bedroom, setBedroom] = useState(search.bedroom);
    const [bathroom, setBathroom] = useState(search.bathroom);
   
    const handleSubmit = (event)=>{
        // to stop immediate changes/ post reques default behaviour of a form
        event.preventDefault();
        // Call function defined in the context to update the values
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            bedroom,
            bathroom
        );
        navigate("/search");
    };
    const minDate = new Date();
    const maxDate = new Date();
    // Set the max date as a year from now
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    // To edit settings based on screen size
    // grid grid-col-2 lg:grid-cols-3 2xl:grid-cols-5 
    return(
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-slate-400 rounded shadow-md grid grid-col-2 2xl:grid-cols-5 items-center gap-4">
         <div className='flex flex-row items-center flex-1 bg-white p-2'>
           <MdTravelExplore size={25} className='mr-2'/>
           <input 
              placeholder="Where are you going?"
              className="text-md w-full focus:outline-none"
              value={destination}
              onChange={(event)=> setDestination(event.target.value)}
            />

         </div>
         <div className='flex bg-white px-2 py-1 gap-3'>
            <label className='items-center flex'>
              Adults:
              <input
               className='w-full p-1 focus:outline-none font-bold'
               type="number"
               min={1} 
               max={10}
               value={adultCount}
               onChange={(event) => setAdultCount(parseInt(event.target.value))}
               />
               
            </label>

            <label className='items-center flex'>
              Children:
              <input
               className='w-full p-1 focus:outline-none font-bold'
               type="number"
               min={0} 
               max={20}
               value={childCount}
               onChange={(event) => setChildCount(parseInt(event.target.value))}
               />
               

            </label>
         </div>

         {/* <div className='flex bg-white px-2 py-1 gap-3'>

            <label className='items-center flex'>
              Bedrooms:
              <input
               className='w-full p-1 focus:outline-none font-bold'
               type="number"
               min={1} 
               max={20}
               value={bedroom}
               onChange={(event) => setBedroom(parseInt(event.target.value))}
               />
               

            </label>

            <label className='items-center flex'>
              Bathrooms:
              <input
               className='w-full p-1 focus:outline-none font-bold'
               type="number"
               min={1} 
               max={20}
               value={bathroom}
               onChange={(event) => setBathroom(parseInt(event.target.value))}
               />
               

            </label> 
         </div> */}


         <div>
            <DatePicker 
             selected={checkIn} 
             onChange={(date)=> setCheckIn(date)}
             selectsStart
             startDate={checkIn}
             endDate={checkOut}
             minDate={minDate}
             maxDate={maxDate}
             placeholderText="Check-in Date"
             className="min-w-full bg-white p-2 focus:outline-none"
             wrapperClassName= "min-w-full"
             />
         </div>
         <div>
            <DatePicker 
             selected={checkOut} 
             onChange={(date)=> setCheckOut(date)}
             selectsStart
             startDate={checkIn}
             endDate={checkOut}
             minDate={minDate}
             maxDate={maxDate}
             placeholderText="Check-out Date"
             className="min-w-full bg-white p-2 focus:outline-none"
             wrapperClassName= "min-w-full"

             />
         </div>

         <div className='flex gap-1'>
            <button className='w-2/3 bg-slate-600 text-white h-full p-2 font-bold text-xl hover:bg-slate-500'>
                Search
            </button>
            <button className='w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500'>
                Clear
            </button>

         </div>


        </form>
    )
}