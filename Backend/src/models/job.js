import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true 
    } ,
    company : {
        type : String ,
        required : true ,
    } ,
    location : {
        type : String ,
        required : true 
    },
    jobType : {
        type : String ,
        default : "Internship"
    },
    experienceLevel : {
        type : String,
        default : "Fresher"
    },
    salary : {
        type : String
    },
    description : {
        type : String,
        required : true 
    },
    skillsRequired :[ {
        type : String
    }],
    recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  applicantsCount: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open"
  }
} , {
    timestamps : true 
})


const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;