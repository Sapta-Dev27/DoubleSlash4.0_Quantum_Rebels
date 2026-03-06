import mongoose from "mongoose";


const analysisSchema = new mongoose.Schema({
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
      type : String
    }
  ]
} , {
  timestamps: true
})

const AnalysisModel = mongoose.model("Analysis", analysisSchema);

export default AnalysisModel;