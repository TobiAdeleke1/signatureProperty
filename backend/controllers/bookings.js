import Property from "../models/property.js";

export const bookings = async(req, res) =>{

  try{
  
    const userId = req.userId;
    
    // Searching on booking documents on the element
    const properties = await Property.find({
        bookings: {$elemMatch: {userId:userId}},
    }); // this returns the entire array

    const results = properties.map((property) =>{
        const userBookings = property.bookings.filter(
            (booking) =>booking.userId === userId
        );
        
        // merge property data with bookings 
        const propertyWithUserBookings = {
            ...property.toObject(), // convert to JS
            bookings: userBookings,
        };

        return propertyWithUserBookings; // all added to result
    });

    res.status(200).send(results);
  
   
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Could not fetch bookings"});
  } 
 
};