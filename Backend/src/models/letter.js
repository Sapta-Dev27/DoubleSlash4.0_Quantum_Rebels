import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
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