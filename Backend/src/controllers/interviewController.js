import { parsePDF } from "../utils/pdfParser.js";
import { generateMockInterview } from "../config/gemini.js";
import { uploadResumeToCloudinary } from "../utils/uploadToCloudinary.js";
import InterviewModel from "../models/Interview.js";

// CREATE AND CONDUCT MOCK INTERVIEW //

const conductMockInterview = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const cloudinaryResult = await uploadResumeToCloudinary(
      fileBuffer,
      req.file.originalname
    );
    const filePath = cloudinaryResult.secure_url;
    console.log("File uploaded to Cloudinary:", filePath);


    const extractPDFtext = await parsePDF(fileBuffer);
    console.log("Extracted PDF Text:", extractPDFtext);

    const interviewQuestions = await generateMockInterview(extractPDFtext);
    console.log("Generated Interview Questions:", interviewQuestions);

    if (!interviewQuestions) {
      return res.status(400).json({
        success: false,
        message: "Failed to generate interview questions"
      })
    }

    const createInterview = await InterviewModel.create({
      resumeURL: filePath,
      rounds: interviewQuestions.rounds,
      status: "Generated"
    })

    if (!createInterview) {
      return res.status(400).json({
        success: false,
        message: "Failed to save interview data"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Mock interview generated successfully",
      data: {
        interviewId: createInterview._id,
        resumeURL: filePath,
        status: createInterview.status,
        rounds: createInterview.rounds
      }
    })
  }
  catch (error) {
    console.log("Error in conductMockInterview:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to conduct mock interview",
      error: error.message
    })
  }
}


// GET ALL INTERVIEWS //


const fetchAllInterviews = async ( req , res) => {
  try { 
    const interviews = await InterviewModel.find();
    const count = await InterviewModel.countDocuments();
     if( interviews.length == 0){
      return res.status(404).json({
        success : false ,
        message : "No interviews found"
      })
     }
     return res.status(200).json({
      success : true ,
      message : "Interviews fetched successfully",
      countInterviews : count ,
      data : interviews
     })
  }
  catch(error){
    console.log("Error in fetchAllInterviews:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch interviews",
      error: error.message
    })
  }
}

// DELETE INTERVIEW  BY ID //

const deleteInterview = async(req , res) => {
  try {
      const paramsId = req.params.id;
      const deleteInterview = await InterviewModel.findByIdAndDelete(paramsId);
      if(!deleteInterview){
        return res.status(404).json({
          success : false ,
          message : "Interview not found with the provided ID"
        })
      }
      return res.status(200).json({
        success : true ,
        message : "Interview deleted successfully" ,
        deletedInterview : deleteInterview
      })
  }
  catch(error){
    console.log("Error in deleteInterview:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete interview",
      error: error.message
    })
  }
}


export { conductMockInterview, fetchAllInterviews , deleteInterview };