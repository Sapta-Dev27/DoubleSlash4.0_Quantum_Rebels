import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
{
  resumeURL: {
    type: String,
    required: true
  },

  name: String,
  email: String,
  phone: String,
  address: String,
  bio: String,

  linkedin: String,
  github: String,
  portfolio: String,

  skills: [String],

  projects: [
    {
      title: String,
      description: String,
      technologies: [String]
    }
  ],

  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String
    }
  ],

  education: [
    {
      institution: String,
      degree: String,
      year: String
    }
  ],

 achievements: [
  {
    title: String,
    description: String
  }
]
},
{ timestamps: true }
);

const ResumeModel = mongoose.model("Resume", resumeSchema);

export default ResumeModel;