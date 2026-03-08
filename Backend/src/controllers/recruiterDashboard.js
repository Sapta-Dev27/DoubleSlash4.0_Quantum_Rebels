import JobModel from "../models/job.js";
import ApplicationModel from "../models/application.js";

const getRecruiterDashboard = async (req, res) => {

  try {

    const recruiterId = req.userInfo.userId;

    // Total jobs posted
    const totalJobs = await JobModel.countDocuments({
      recruiter: recruiterId
    });

    // Open jobs
    const openJobs = await JobModel.countDocuments({
      recruiter: recruiterId,
      status: "Open"
    });

    // Closed jobs
    const closedJobs = await JobModel.countDocuments({
      recruiter: recruiterId,
      status: "Closed"
    });

    // Get recruiter's jobs
    const recruiterJobs = await JobModel.find({
      recruiter: recruiterId
    });

    const jobIds = recruiterJobs.map(job => job._id);

    // Total applications
    const totalApplications = await ApplicationModel.countDocuments({
      job: { $in: jobIds }
    });

    // Recent jobs
    const recentJobs = await JobModel.find({
      recruiter: recruiterId
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent applications
    const recentApplications = await ApplicationModel.find({
      job: { $in: jobIds }
    })
      .populate("candidate", "userName userEmail")
      .populate("job", "title company")
      .sort({ createdAt: -1 })
      .limit(5);

    // Jobs with applicant counts
    const jobsAnalytics = recruiterJobs.map(job => ({
      jobId: job._id,
      title: job.title,
      company: job.company,
      applicants: job.applicantsCount,
      status: job.status
    }));

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalJobs,
          totalApplications,
          openJobs,
          closedJobs
        },
        recentJobs,
        recentApplications,
        jobsAnalytics
      }
    });

  } catch (error) {

    console.log("Error occurred while fetching recruiter dashboard data:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }

};

export default getRecruiterDashboard;