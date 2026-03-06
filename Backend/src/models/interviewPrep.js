import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema({
  question : {
    type : String,
  },
  answer : {
    type : String,
  },
  difficulty : {  
    type : String,
  },
  topic : {
    type : String,
  }
})

const interviewPrepSchema = new mongoose.Schema({
  role : {
    type : String,
    required : true
  },
  experience_level : {
    type : String,
    required : true
  },
  seniority : {
    type : String,
    required : true 
  },
  questions : [questionSchema]
},
{ timestamps : true })

const InterviewPrepModel = mongoose.model("InterviewPrep", interviewPrepSchema);
export default InterviewPrepModel;
