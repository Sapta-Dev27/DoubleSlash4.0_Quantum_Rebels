
const candidateMiddleware = (req, res, next) => {
  try {

    if (req.userInfo.userRoleFromAccessToken !== "candidate") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Candidates only."
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in candidate middleware"
    });
  }
};

export default candidateMiddleware;