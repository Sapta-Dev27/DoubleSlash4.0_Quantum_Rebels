import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
{
  TITLE: String,
  DESCRIPTION: String,
  URL: String,
  LOCATION: String,
  "POSTED ON": Date,
  "EMPLOYMENT TYPE": String
},
{
  collection: "jobs"
});

export default mongoose.model("ScrapedJob", jobSchema);