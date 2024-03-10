import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function GuestInfoForm({propertyId, pricePerNight}){
    const { isLoggedIn } = useAppContext();
    const search = useSearchContext();
    const {
         watch,
         register,
         handleSubmit,
         setValue,
         formState: {errors} ,
        } = useForm({
            // Prepopulate form with info from the search context
            defaultValues:{
                checkIn: search.checkIn,
                checkOut: search.checkOut,
                adultCount: search.adultCount,
                childCount: search.childCount
            }
        });

        // watch to get the updated values of this fields
        const checkIn = watch("checkIn");
        const checkOut = watch("checkOut");

        const minDate = new Date();
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);

        const navigate = useNavigate();
        const location = useLocation();

        const onSignInClick = (data) =>{
             search.saveSearchValues(
                "",
                data.checkIn,
                data.checkOut, 
                data.adultCount,
                data.childCount
            );
            // store state to reuse after signing
            navigate("/sign-in", {state: {from : location}})
        }

        const onSubmit = (data) =>{
            search.saveSearchValues(
               "",
               data.checkIn,
               data.checkOut, 
               data.adultCount,
               data.childCount
           );
           // store state to reuse after signing
           navigate(`/property/${propertyId}/booking` )
       }
       



        return (
            <div className="flex flex-col p-4 bg-slate-200 gap-4">
                <h3 className="text-md font-bold">
                    £{pricePerNight}
                </h3>
                
                <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                    <div className="grid grid-cols-1 gaps-4 item-center">
                        <div>
                        <DatePicker 
                            required
                            selected={checkIn} 
                            onChange={(date)=> setValue("checkIn", date)}
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
                                required
                                selected={checkOut} 
                                onChange={(date)=> setValue("checkOut", date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-Out Date"
                                className="min-w-full bg-white p-2 focus:outline-none"
                                wrapperClassName= "min-w-full"
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
                            {...register("adultCount", {
                                required: "This field is required",
                                min:{
                                    value: 1,
                                    message: "There must be at least one adult"
                                },
                                valueAsNumber:true

                            })}
                            
                            />
                            
                            </label>

                            <label className='items-center flex'>
                            Children:
                            <input
                            className='w-full p-1 focus:outline-none font-bold'
                            type="number"
                            min={0} 
                            max={20}
                            {...register("childCount", {
                                valueAsNumber:true
                            })}
                            />
                            
                            </label>
                            {errors.adult && (
                                <span className="text-red-500 font-semibold text-sm">
                                    {errors.adult.message}
                                </span>
                            )}
                        </div>


                        {isLoggedIn ? 
                           (<button className="bg-slate-700 text-white h-full p-2 font-bold hover:opacity-80"> Book Now </button>) 
                           : (<button  className="bg-slate-700 text-white h-full p-2 font-bold hover:opacity-80">
                            Sign in to book </button>)
                            
                        }

                        
                    </div>
                </form>
            </div>
        )

    
}
