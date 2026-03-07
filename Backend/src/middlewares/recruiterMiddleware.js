const recruiterMiddleware = (req, res, next) => {
  try {

    if (req.userInfo.userRoleFromAccessToken !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Recruiters only."
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in recruiter middleware"
    });
  }
};

export default recruiterMiddleware;