import { generateInterviewPrep } from '../config/gemini.js'
import InterviewPrepModel from '../models/interviewPrep.js'

const generateInterviewPrepController = async (req, res) => {
  try {
    const { role, experience, seniority } = req.body;

    if (!role || !experience || !seniority) {
      return res.status(400).json({
        success: false,
        message: "Role, experience, and seniority are required to generate interview preparation questions"
      })
    }

    const prepData = await generateInterviewPrep(role, experience, seniority)

    if (!prepData) {
      return res.status(400).json({
        success: false,
        message: "Failed to generate interview preparation questions"
      })
    }

    const saveInterviewPrep = await InterviewPrepModel.create({
      role: role,
      experience_level: experience,
      seniority: seniority,
      questions: prepData.questions
    })

    return res.status(200).json({
      success: true,
      message: "Interview preparation questions generated successfully and saved to Database",
      data: saveInterviewPrep
    })

  }
  catch (error) {
    console.log("Error generating interview prep:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating interview preparation questions.",
      error: error.message
    })
  }
}


const fetchAllInterviews = async (req, res) => {
  try {
    const fetchAll = await InterviewPrepModel.find();
    const count = await InterviewPrepModel.countDocuments();

    if (fetchAll.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No interview preparation data found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "All interview preparation data fetched successfully",
      count: count,
      data: fetchAll
    })
  }
  catch (error) {
    console.log("Error fetching interview preps:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching interview preparation questions.",
      error: error.message
    })
  }
}

const deleteInterviewPrep = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const deletedPrep = await InterviewPrepModel.findByIdAndDelete(deleteId);

    if (!deletedPrep) {
      return res.status(400).json({
        success: false,
        message: "Interview preparation data not found or already deleted"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Interview preparation data deleted successfully",
      data: deletedPrep
    })
  }
  catch (error) {
    console.log("Error deleting interview prep:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the interview preparation data.",
      error: error.message
    })
  }
}

export { generateInterviewPrepController, fetchAllInterviews  , deleteInterviewPrep}