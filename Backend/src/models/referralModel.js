import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
{
  "LinkedIn URL": String,
  "Full Name": String,
  Headline: String,
  Email: String,
  "Current Company": String,
  City: String,
  Mail: String
},
{
  collection: "referrals"
});

export default mongoose.model("Referral", referralSchema);