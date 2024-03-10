import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form"
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";

export default function BookingForm( {currentUser, paymentIntent }){
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const search = useSearchContext();
    const {propertyId } = useParams();

    const { mutate:bookProperty, isLoading } = useMutation(apiClient.createPropertyBooking, {
        onSuccess:()=>{
          console.log("Booking Saved");
          navigate("/my-bookings")
        },
        onError: (error) => {
            console.log("Booking Failed", error);
        }
    });

    // All the values to create the booking
    const { handleSubmit, register} = useForm({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            propertyId: propertyId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
            
        },
    });

    const onSubmit = async (formData) =>{

         // send card detail to stripe, without our backend having access to the information
        const result = await stripe.confirmCardPayment(
            paymentIntent.clientSecret,
            {
                payment_method:{
                    card: elements.getElement(CardElement),
                },
            });
          
            if(result.paymentIntent?.status === "succeeded"){
                // book the property if payment succes,
                // spread form data from useform and add intent id
              
                bookProperty({
                    ...formData,
                    paymentIntentId:result.paymentIntent.id});
            }
       
    }

    return(
     
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-col-1 gap-5 rounded-lg border border-slate-300 p-5">
            <span className="text-3xl font-bold">
                Confirm Your Details
            </span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bond flex-1">
                    First Name
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 texy-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        disabled
                        {...register("firstName")}
                    />
                </label>

                <label className="text-gray-700 text-sm font-bond flex-1">
                    Last Name
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 texy-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        disabled
                        {...register("lastName")}
                    />
                </label>

                <label className="text-gray-700 text-sm font-bond flex-1">
                    Email
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 texy-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        disabled
                        {...register("email")}
                    />
                </label>
            </div>
            
            <div className="space-y-2">
               <h2 className="font-semibold text-lg">
                 Your Price Summary 
               </h2> 
               <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: £{paymentIntent.totalCost.toFixed(2)}

                    </div>
                    <div className="text-xs">
                        Includes taxes and charges
                    </div>

                 </div>
           

            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                     Payment Details
              </h3>
              <CardElement 
               id="payment-element"
               className="border rounded-md p-2 text-sm" />

            </div>

            <div className="flex justify-end">
                <button 
                  disabled={isLoading}
                  type="submit"
                  className="bg-slate-300 text-whit p-2 font-bold hover:opacity-80 text-md disabled:bg-gray-500"
                  >
                  {isLoading ? "Saving ...": "Confirm Booking"}
                  

                </button>

            </div>
        </form>

   
    );
}