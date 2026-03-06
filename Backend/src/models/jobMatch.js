import mongoose from 'mongoose'


const jobMatchSchema = new mongoose.Schema({
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