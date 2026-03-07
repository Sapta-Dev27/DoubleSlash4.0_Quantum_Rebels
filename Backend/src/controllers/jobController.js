import JobModel from "../models/job.js";

const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, experienceLevel, salary, description, skillsRequired } = req.body;
    const userId = req.userInfo.userId;

    if (!title || !company || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      })
    }

    const newJob = await JobModel.create({
      recruiter : userId,
      title,
      company,
      location,
      jobType,
      experienceLevel,
      salary,
      description,
      skillsRequired
    })


    if (!newJob) {
      return res.status(400).json({
        success: false,
        message: "Failed to create job"
      })
    }
    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob
    })
  }
  catch (error) {
    console.log('Create Job Error : ', error);
    return res.status(500).json({
      success: false,
      message: "Failed to create job"
    })
  }
}


const fetchAllJobs = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const findAllJobs = await JobModel.find( {
      recruiter : userId
    })
    if (findAllJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: findAllJobs
    })
  }
  catch (error) {
    console.log('Fetch All Jobs Error : ', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    })
  }
}

const fetchJobsById = async (req, res) => {
  try {
    const jobID = req.params.id;
    const userId = req.userInfo.userId;
    const fetchJobById = await JobModel.findById(jobID);
    
    if (!fetchJobById) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: fetchJobById
    })
  }
  catch (error) {
    console.log('Fetch Job By Id Error : ', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job"
    })
  }
}


const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { title, company, location, jobType, experienceLevel, salary, description, skillsRequired } = req.body;

    const updatedJob = await JobModel.findByIdAndUpdate({ _id: jobId }, {
      title,
      company,
      location,
      jobType,
      experienceLevel,
      salary,
      description,
      skillsRequired
    }, { new: true })


    if (!updatedJob) {
      return res.status(400).json({
        success: false,
        message: "Failed to update job"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob
    })
  }
  catch (error) {
    console.log('Update Job Error : ', error);
    return res.status(500).json({
      success: false,
      message: "Failed to update job"
    })
  }
}


const deleteJob = async(req , res) => {
  try {
    const jobId = req.params.id;
    const deleteJob = await JobModel.findByIdAndDelete({_id : jobId});
    if(!deleteJob){
      return res.status(400).json({
        success : false , 
        message : "Failed to delete job"
      })
    }
    return res.status(200).json({
      success : true , 
      message : "Job deleted successfully"
    })
  }
  catch(error){
    console.log('Error in deleting job : ', error);
    return res.status(500).json({
      success : false , 
      message : "Failed to delete job"
    })
  }
}


export { createJob, fetchAllJobs, fetchJobsById, updateJob , deleteJob }