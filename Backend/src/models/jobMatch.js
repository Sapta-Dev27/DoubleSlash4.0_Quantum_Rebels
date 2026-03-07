import mongoose from 'mongoose'


const jobMatchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  resumeURL: {
    type: String,
  },
  jobDescription: {
    type: String
  },
  matchScore: {
    type: Number
  },
  matchingSkills: [String],
  missingSkills: [String],
  strengths: [String],
  improvements: [String],
  summary: {
    type: String
  }
}, {
  timestamps: true
})


const jobMatchModel = mongoose.model("jobMatch", jobMatchSchema);

export default jobMatchModel;