
export default function BookingDetailsSummary({
    checkIn, 
    checkOut, 
    adultCount,
    childCount,
    numberOfNights,
    property,
}){
    
    return(
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2 className="text-xl font-bold"> Your Booking Details </h2>
            <div className="border-b py-2">
                Location:
                <div className="font-semibold"> {`${property.name}, ${property.address}`}</div>

            </div>
            <div className="flex justify-between">
                <div>
                    Check-in
                    <div className="font-semibold">{checkIn.toDateString()}</div>
                </div>
                <div>
                    Check-out
                    <div className="font-semibold">{checkOut.toDateString()}</div>
                </div>
            </div>

            <div className="border-t border-b py-2">
                Total Length of stay:
                 <div className="font-semibold">
                  {numberOfNights} nights

                 </div>
            </div>
            <div>
                Guests
                <div className="font-semibold">
                 {adultCount} adults & {childCount} children 

                </div>
            </div>

        </div>
    )

}