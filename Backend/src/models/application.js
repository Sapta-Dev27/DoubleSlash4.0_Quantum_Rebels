import mongoose from 'mongoose';

const applicationschema=new mongoose.Schema({
    job : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    } , 
    candidate : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    resumeURL  : {
        type : String,
    },
    status : {
        type : String,
        default : 'applied',
    }
} , {
    timeseries : true
})


const ApplicationModel = mongoose.model("Application", applicationschema);  
export default ApplicationModel;