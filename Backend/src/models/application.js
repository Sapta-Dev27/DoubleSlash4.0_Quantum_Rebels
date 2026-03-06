const mongoose=require('mongoose');
const job = require('./job');

const applicationSchema=new mongoose.Schema(
    {
        candidate:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        job:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job",
            required:true,
        },
        resume:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resume",
        },
        status:{
            type:String,
            enum:['pending','shortlisted','rejected'],
            default:'pending',
        },
    },
    {timestamps:true}
);
applicationSchema.index({candidate:1, job:1},{unique:true});
module.exports=mongoose.model("Application",applicationSchema);