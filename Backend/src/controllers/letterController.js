import { generateCoverLetter } from '../config/gemini.js';
import letterModel from '../models/letter.js';



const createCoverLetter = async (req, res) => {
  try {
    const { role, company, description } = req.body;
    if (!role || !company || !description) {
      return res.status(400).json({
        success: false,
        message: "Some of the input fields are missing. Please provide role, company and description to generate the cover letter"
      })
    }

    const generateLetter = await generateCoverLetter(role, company, description);

    if (!generateLetter) {
      return res.status(400).json({
        success: false,
        message: "AI failed to generate the cover letter. Please try again later."
      })
    }

    const saveLetter = await letterModel.create({
      jobRole: role,
      companyName: company,
      jobDescription: description,
      coverLetter: generateLetter
    })

    if (!saveLetter) {
      return res.status(400).json({
        success: false,
        message: "Failed to save the generated cover letter. Please try again later."
      })
    }

    return res.status(201).json({
      success: true,
      message: "Cover letter generated and saved successfully",
      data: saveLetter
    })
  }
  catch (eror) {
    console.log("Error in createCoverLetter controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error took place in creating the cover letter",
      error: error.message
    })
  }
}


const fetchAllCoverLetters = async (req, res) => {
  try {

    const findLetters = await letterModel.find();
    const countDocuments = await letterModel.countDocuments();

    if (findLetters.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No such data found of cover letters"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cover letters fetched successfully",
      total: countDocuments,
      data: findLetters
    })
  }
  catch (error) {
    console.log("Error in fetchAllCoverLetters controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error took place in fetching all the cover letters",
      error: error.message
    })
  }
}

const fetchCoverLetterById = async (req, res) => {
  try {
    const letterId = req.params.id;
    if (!letterId) {
      return res.status(400).json({
        success: false,
        message: "Letter id is required to fetch the cover letter"
      })
    }
    const findLetter = await letterModel.findById(letterId);
    if (!findLetter) {
      return res.status(404).json({
        success: false,
        message: "No such cover letter found with the provided id"
      })
    }
    return res.status(200).json({
      success: false,
      message: "Cover letter fetched successfully by id",
      data: findLetter
    })
  }
  catch (error) {
    console.log("Error in fetchCoverLetterById controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error took place in fetching the cover letter by id",
      error: error.message
    })
  }
}


const deleteCoverLetterById = async(req , res) => {
  try {
    const letterId = req.params.id ;
    const deleteLetter = await letterModel.findByIdAndDelete(letterId);

    if(!deleteLetter){
      return res.status(400).json({
        success : false ,
        message : "Failed to delete the cover letter. Please check the provided id and try again."
      })
    }

    return res.status(200).json({
      success : true  ,
      message : 'Deleted successfully cover letter with the provided id' ,
      data : deleteLetter
    })
  }
  catch(error){
    console.log("Error in deleting cover letter" , error);
    return res.status(500).json({
    success : false ,
     message :  'Internal server error' ,
     error : error.message 
    })
  }
}


export { createCoverLetter, fetchAllCoverLetters, fetchCoverLetterById, deleteCoverLetterById };