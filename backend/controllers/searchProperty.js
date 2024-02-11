import Property from "../models/property.js";

export const searchProperty = async(req, res)=>{

    try{
        const pageSize = 5;
        const pageNum = parseInt(
            req.query.page ? req.query.page.toString() : "1"
            );
        const pageSkip = (pageNum-1) * pageSize;
        const properties = await Property.find().skip(pageSkip).limit(pageSize);
        const totalDocument = await Property.countDocuments();
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