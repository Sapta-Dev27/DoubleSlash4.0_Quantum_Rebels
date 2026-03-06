const mongoose =require('mongoose');

const jobschema=new mongoose.Schema(
    {
        recruiter:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            required:true,
            index:true,
        },
        description:{
            type:String,
            required:true,
        },
        location:String,
        experienceRequired:String,
        salary:String,
    },

    {timestamps:true}
);

module.exports=mongoose.model("Job",jobschema);