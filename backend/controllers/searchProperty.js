import Property from "../models/property.js";

export const searchProperty = async(req, res)=>{

    try{
        const query = constructSearchQuery(req.query);
        const pageSize = 5;
        const pageNum = parseInt(
            req.query.page ? req.query.page.toString() : "1"
            );
        const pageSkip = (pageNum-1) * pageSize;
        const properties = await Property.find(query).skip(pageSkip).limit(pageSize);
        const totalDocument = await Property.countDocuments(query);

        const response = {
            data: properties,
            pagination: {
                totalDocument,
                page: pageNum,
                pages: Math.ceil(totalDocument/pageSize),
            }
        };
      
        res.json(response);
    }catch(error){
        console.log("error", error);
        res.status(500).json({message: "Internal Server Error"});
    }

};

const constructSearchQuery = (userQuery) =>{
    let constructedQuery = {};

    if(userQuery.destination){
        constructedQuery.address = {
            $regex: new RegExp(userQuery.destination, "i")
        };

    }

    if(userQuery.adultCount){
        constructedQuery.adultCount = {
            $gte: parseInt(userQuery.adultCount),
        };

    }

    if(userQuery.childCount){
        constructedQuery.childCount = {
            $gte: parseInt(userQuery.childCount),
        };
        
    }

    // if(userQuery.bedroom){
    //     constructedQuery.bedroom = {
    //         $gte: parseInt(userQuery.bedroom),
    //     };
        
    // }

    // if(userQuery.bathroom){
    //     constructedQuery.bathroom = {
    //         $gte: parseInt(userQuery.bathroom),
    //     };   
    // }

    if(userQuery.facilities){
        // if multiple are selected return array, else
        // create a single array 
        constructedQuery.facilities = {
            $all: Array.isArray(userQuery.facilities)
            ? userQuery.facilities 
            : [userQuery.facilities],
        };
    }

    if(userQuery.type){
        constructedQuery.type = {
            $in: Array.isArray(userQuery.type)
            ? userQuery.type 
            : [userQuery.type],

        };

    }

    if(userQuery.starRating){
        const starRatings = Array.isArray(userQuery.starRating) 
        ? userQuery.starRating.map((starRating) => parseInt(starRating))
        : parseInt(userQuery.starRating);
        
       
        constructedQuery.starRating = {
            $in: starRatings
        };

    }

    if(userQuery.pricePerNight){
        constructedQuery.pricePerNight = {
            $lte : parseInt(userQuery.pricePerNight),
        };
        
    }

    return constructedQuery;
};