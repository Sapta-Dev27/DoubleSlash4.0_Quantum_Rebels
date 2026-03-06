import { parsePDF } from '../utils/pdfParser.js';
import jobMatchModel from '../models/jobMatch.js';
import { uploadResumeToCloudinary } from '../utils/uploadToCloudinary.js'
import { analyzeJobMatch } from '../config/gemini.js'


const jobMatchController = async (req, res) => {
  try {

    const { description } = req.body;

    const fileBuffer = req.file.buffer;
    const uploadResult = await uploadResumeToCloudinary(fileBuffer);
    const resumeURL = uploadResult.secure_url;


    const resumeText = await parsePDF(fileBuffer);

    const analysisReslt = await analyzeJobMatch(resumeText, description);

    if (!analysisReslt) {
      return res.status(400).json({
        success: false,
        message: "AI failed to analyze the job match. Please try again later."
      })
    }

    const saveAnalysis = await jobMatchModel.create({
      resumeURL: resumeURL,
      jobDescription: description,
      matchScore: analysisReslt.match_score,
      matchingSkills: analysisReslt.matching_skills,
      missingSkills: analysisReslt.missing_skills,
      strengths: analysisReslt.strengths,
      improvements: analysisReslt.improvements,
      summary: analysisReslt.summary
    })

    if (!saveAnalysis) {
      return res.status(400).json({
        success: false,
        message: 'Failed to saved analysis in Database'
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Data saved successfully',
      data: saveAnalysis
    })
  }
  catch (error) {
    console.log("Error in jobMatchController: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error took place in job matching",
      error: error.message
    })
  }
}

const findAllJobMatches = async (req, res) => {
  try {
    const findMatches = await jobMatchModel.find();

    if (findMatches.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No analysis found'
      })
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully ",
      data: findMatches,
    }
    )
  }
  catch (error) {
    console.log("Error in findAllJobMatches controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error took place in fetching job matches",
      error: error.message
    })
  }
}

const findJobMatchById = async (req, res) => {
  try {
    const id = req.params.id;
    const findMatch = await jobMatchModel.findById(id);
    if (!findMatch) {
      return res.status(400).json({
        success: false,
        message: 'No analysis found with the provided ID'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Data fetched successfully',
      data: findMatch
    })
  } catch (error) {
    console.log("Error in findJobMatchById controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error took place in fetching job match by ID",
      error: error.message
    })
  }
}

  const deleteAnalysis = async (req, res) => {
    try {
      const deleteId = req.params.id;

      const deleteAnalysis = await jobMatchModel.findByIdAndDelete(deleteId);
      if (!deleteAnalysis) {
        return res.status(400).json({
          success: false,
          message: 'No analysis found with the provided ID'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Analysis deleted successfully'
      })
    }
    catch (error) {
      console.log('Error in deleting analysis of job match', error);
      return res.status(500).json({
        success: false,
        message: "Internal server error took place in deleting job match analysis",
        error: error.message
      })
    }
  }

  export { jobMatchController, findAllJobMatches, deleteAnalysis , findJobMatchById }