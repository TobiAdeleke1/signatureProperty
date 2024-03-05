import mongoose from 'mongoose';
import bookingSchema from './booking.js';

const propertySchema = new mongoose.Schema(
    {   
        userId:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required: true
        },
        description: {
            type: String,
            required: true

        },
        address:{
            type:String,
            required: true
        },
        type: {
            type:String,
            required: true
        },
        adultCount: {
            type: Number,
            required: true
        },
        childCount:{
            type: String,
            required:true
        },
        bedroom:{
            type: Number,
            required: true

        },
        bathroom:{
            type: Number,
            required: true
        },
        facilities: {
            type:Array, 
            required:true
        },
        pricePerNight:{
            type: Number,
            required: true
        },
        starRating: {
            type:Number,
            required:true,
            min:1,
            max:5
        },
        imageUrls: {
            type:Array,
            required: true
        },
        lastUpdated:{
            type:Date,
            required:true
        },
        bookings: [bookingSchema], // One to many
   },
   {timestamps: true}
);

const Property = mongoose.model('Property', propertySchema);
export default Property;
