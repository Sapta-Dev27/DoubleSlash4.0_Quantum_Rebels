import InterviewModel from "../models/Interview.js";
import AnalysisModel from "../models/analysis.js";
import InterviewPrepModel from "../models/interviewPrep.js";
import letterModel from "../models/letter.js";
import JobApplicationModel from "../models/application.js";

const getDashboardStats = async (req, res) => {

  try {

    const userId = req.userInfo.userId;

    const [
      mockInterviews,
      resumeAnalysis,
      interviewPrep,
      coverLetters,
      jobsApplied,
      jobsShortlisted
    ] = await Promise.all([

      InterviewModel.countDocuments({ user: userId }),

      AnalysisModel.countDocuments({ user: userId }),

      InterviewPrepModel.countDocuments({ user: userId }),

      letterModel.countDocuments({ user: userId }),

      JobApplicationModel.countDocuments({ user: userId }),

      JobApplicationModel.countDocuments({
        user: userId,
        status: "shortlisted"
      })

    ]);

    return res.status(200).json({

      success: true,

      data: {

        mockInterviews,
        resumeAnalysis,
        interviewPrep,
        coverLetters,
        jobsApplied,
        jobsShortlisted

      }

    });

  } catch (error) {

    console.log("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message
    });

  }

};

export { getDashboardStats };