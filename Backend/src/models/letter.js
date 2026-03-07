import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "user" ,
    required : true
  },
  jobRole : {
    type : String ,
    required : true 
  } ,
  jobDescription : {
    type : String ,
    required : true
  },
  companyName : {
    type : String ,
    required : true
  },
  coverLetter : {
    type : String ,
    required : true 
  }
})


const letterModel = mongoose.model("letter" , letterSchema);

export default letterModel;