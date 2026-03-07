import JobModel from "../models/job.js";
import ApplicationModel from "../models/application.js";
import { uploadResumeToCloudinary } from '../utils/uploadToCloudinary.js'

const applyJob = async (req, res) => {
  try {

    const jobId = req.params.jobId;
    const userId = req.userInfo.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required"
      });
    }

    const fileBuffer = req.file.buffer;

    const uploadResult = await uploadResumeToCloudinary(fileBuffer);
    const resumeurl = uploadResult.secure_url;

    const existing = await ApplicationModel.findOne({
      job: jobId,
      candidate: userId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job"
      });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.status === "Closed") {
      return res.status(400).json({
        success: false,
        message: "Applications are closed for this job"
      });
    }

    const application = await ApplicationModel.create({
      job: jobId,
      candidate: userId,
      resumeURL: resumeurl,
    });

    await JobModel.findByIdAndUpdate(
      jobId,
      { $inc: { applicantsCount: 1 } }
    );

    return res.status(201).json({
      success: true,
      message: "Applied to job successfully",
      data: application
    });

  }
  catch (error) {

    console.log("Apply Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });

  }
};


const getApplicantsForJob = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const jobId = req.params.jobId;
    const applications = await ApplicationModel.find({ job: jobId }).populate("candidate", "userName userEmail resumeURL")

    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      data: applications
    })
  }
  catch (error) {
    console.log('Error in connecting database', error);
    return res.status(500).json({
      success: false,
      message: 'Some error took place',
      error: error.message
    })
  }
}


const getMyApplications = async (req, res) => {
  try {

    const userId = req.userInfo.userId;
    const findAppications = await ApplicationModel.find({ candidate: userId }).populate("job");

    if (findAppications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: findAppications
    })

  }
  catch (error) {
    console.log('Error in connecting database', error);
    return res.status(500).json({
      success: false,
      message: 'Some error took place',
      error: error.message
    })
  }
}


const updateApplicationStatus = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const applicationId = req.params.applyId;
    const { status } = req.body;
    const updatedApplication = await ApplicationModel.findByIdAndUpdate({
      _id: applicationId
    }, {
      status: status
    })

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication
    })

  }
  catch (error) {
    console.log('Error in connecting database', error);
    return res.status(500).json({
      success: false,
      message: 'Some error took place',
      error: error.message
    })
  }
}

export { applyJob, getApplicantsForJob, getMyApplications, updateApplicationStatus }