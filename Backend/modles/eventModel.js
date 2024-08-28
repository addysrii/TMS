import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
title :{type: String, required:true},
description:{type:String,required:true},
date : {type:Date, required:true},
location : { type:String, required:true},
price : {type:Number, required:true},
seats : {type:Number, required:true},
bookedSeats : {type:Number, default:0},
image : {type:String,default:"../../uploads/image.png",required:true},
createdBy : {type:mongoose.Schema.Types.ObjectId, ref:'User'},

},
 {
    timestamps: true,
  }
)

const Event = mongoose.model('Event',eventSchema)
export default  Event