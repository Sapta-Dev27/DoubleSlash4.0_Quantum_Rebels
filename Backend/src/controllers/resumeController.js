import ResumeModel from "../models/Resume.js";
import { uploadResumeToCloudinary } from "../utils/uploadToCloudinary.js";
import { parsePDF } from "../utils/pdfParser.js";
import { parseResumeWithAI } from "../config/gemini.js";


const createResumeSummary = async (req, res) => {
  try {

    const fileBuffer = req.file.buffer;

    const uploadClodinaryResult = await uploadResumeToCloudinary(fileBuffer, req.file.originalname);
    const secureURL = uploadClodinaryResult.secure_url;

    const extractedText = await parsePDF(fileBuffer);
    console.log("Extracted Resume Text:", extractedText);


    const resumeSummary = await parseResumeWithAI(extractedText);
    console.log("Parsed Resume Summary:", resumeSummary);

    if (!resumeSummary) {
      return res.status(400).json({
        success: false,
        message: "Failed to parse resume with AI",
      })
    }

    const createResume = await ResumeModel.create({
      resumeURL: secureURL,
      ...resumeSummary
    })

    if (!createResume) {
      return res.status(400).json({
        success: false,
        message: "Failed to save resume summary to database"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Resume summary created successfully",
      data: createResume
    })
  }
  catch (error) {
    console.log("Error in createResumeSummary:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create resume summary",
      error: error.message
    })
  }
}


const fetchResumeSummary = async (req, res) => {
  try {
    const findResumes = await ResumeModel.find();
    const countResumes = await ResumeModel.countDocuments();

    if (findResumes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No resumes found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Resumes fetched successfully",
      data: findResumes,
      count: countResumes
    })
  }
  catch (error) {
    console.log("Error in fetchResumeSummary:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume summaries",
      error: error.message
    })
  }
}

const deleteResumeSummary = async( req , res) => {
  try {
    const deleteId = req.params.id ;
    const deleteResume = await ResumeModel.findByIdAndDelete(deleteId);

    if( !deleteResume) {
      return res.status(404).json({
        success : false ,
        message : "Resume not found with the provided ID"
      })
    }

    return res.status(200).json({
      success : true ,
      message : "Resume deleted successfully" ,
      data : deleteResume
    })
  }
 catch(error){
  console.log("Error in deleteResumeSummary:", error);
  return res.status(500).json({
    success: false,
    message: "Failed to delete resume summary",
    error: error.message
  })
 }
}

export {
  createResumeSummary, fetchResumeSummary , deleteResumeSummary
};