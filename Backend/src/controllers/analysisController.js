import AnalysisModel from "../models/analysis.js";
import { analyzeResumeWithAI } from "../config/gemini.js";
import { uploadResumeToCloudinary } from '../utils/uploadToCloudinary.js'
import { parsePDF } from '../utils/pdfParser.js'

const analyzeResume = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const userId = req.userInfo.userId;

    const uploadURL = await uploadResumeToCloudinary(fileBuffer);
    const resumeURL = uploadURL.secure_url;

    const resumeText = await parsePDF(fileBuffer);
    console.log("Extracted Resume Text:", resumeText);

    const aiAnalysis = await analyzeResumeWithAI(resumeText);

    if (!aiAnalysis) {
      return res.status(400).json({
        success: false,
        message: "Failed to analyze resume with AI."
      })
    }

    const savedAnalysis = await AnalysisModel.create({
      user: userId,
      resumeURL: resumeURL,
      atsScore: aiAnalysis.ats_score,
      strength: aiAnalysis.strengths,
      weakness: aiAnalysis.weaknesses,
      missingKeywords: aiAnalysis.missing_keywords,
      suggestions: aiAnalysis.suggestions
    })

    if (!savedAnalysis) {
      return res.status(400).json({
        success: false,
        message: "Failed to save analysis to database."
      })
    }

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data: savedAnalysis
    })

  }
  catch (error) {
    console.log("Error analyzing resume:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while analyzing the resume.",
      error: error.message
    })
  }
}

const fetchallAnalysis = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const fetchAll = await AnalysisModel.find({
      user: userId
    })


    if (fetchAll.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No analysis found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'All analysis fetched successfully',
      data: fetchAll
    })
  }
  catch (error) {
    console.log("Error fetching analyses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching analyses.",
      error: error.message
    })
  }
}


const deleteAnalysis = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const userId = req.userInfo.userId;

    const deletedAnalysis = await AnalysisModel.findByIdAndDelete(deleteId);

    if (!deletedAnalysis) {
      return res.status(400).json({
        success: false,
        message: "Analysis not found or already deleted"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
      data: deletedAnalysis
    })

  }
  catch (error) {
    console.log("Error deleting analysis:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the analysis.",
      error: error.message
    })
  }
}


const fetchAnalysisById = async (req, res) => {
  try {
    const analysisId = req.params.id;
    const userId = req.userInfo.userId;

    const analysis = await AnalysisModel.findOne({
      _id: analysisId,
      user: userId
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Analysis fetched successfully",
      data: analysis
    })
  }
  catch (error) {
    console.log("Error fetching analysis by ID:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the analysis.",
      error: error.message
    })
  }
}


export { analyzeResume, fetchallAnalysis, deleteAnalysis, fetchAnalysisById }