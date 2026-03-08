import mongoose from "mongoose";


const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeURL: {
    type: String,
  },
  atsScore: {
    type: Number,
    required: true,
  },
  strength: [
    {
      type: String,
    }
  ],
  weakness: [
    {
      type: String,
    }
  ],
  missingKeywords: [
    {
      type: String
    }
  ],
  suggestions: [
    {
      type: String
    }
  ],
  learningResources: [
    Object]
}, {
  timestamps: true
})

const AnalysisModel = mongoose.model("Analysis", analysisSchema);

export default AnalysisModel;