import axios from "axios";
import ScrapedJob from "../models/scrappedModel.js";
import Referral from "../models/referralModel.js";


// JOB SCRAPER
export const triggerJobScraper = async (req,res)=>{

  try{

    const { role , location } = req.body;

    await axios.post(
      "https://quantam123456789.app.n8n.cloud/webhook/job-scraping",
      {
        role,
        location
      }
    );

    return res.status(200).json({
      success:true,
      message:"Job scraping started"
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to trigger job scraper"
    });

  }

};


// FETCH SCRAPED JOBS

export const fetchScrapedJobs = async (req,res)=>{

  try{

    const jobs = await ScrapedJob
      .find()
      .sort({ "POSTED ON": -1 })
      .limit(50);

    return res.status(200).json({
      success:true,
      data:jobs
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success:false
    });

  }

};


// REFERRAL AGENT

export const triggerReferralAgent = async (req,res)=>{

  try{

    const { linkedinUrl , jobTitle , location } = req.body;

    await axios.post(
      "https://quantam123456789.app.n8n.cloud/webhook/ReferalAgent",
      {
        linkedinUrl,
        jobTitle,
        location
      }
    );

    return res.status(200).json({
      success:true,
      message:"Referral search started"
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success:false
    });

  }

};


// FETCH REFERRALS

export const fetchReferrals = async (req,res)=>{

  try{

    const referrals = await Referral
      .find()
      .sort({ _id:-1 })
      .limit(50);

    return res.status(200).json({
      success:true,
      data:referrals
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success:false
    });

  }

};


// GITHUB SCORE AGENT

export const triggerGithubScore = async (req,res)=>{

  try{

    const { repoUrl } = req.body;

    const response = await axios.post(
      "https://quantam123456789.app.n8n.cloud/webhook/9cd921fa-58d2-4911-b907-4d430ad92878",
      {
        repoUrl
      }
    );

    return res.status(200).json({
      success:true,
      data:response.data
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      success:false
    });

  }

};