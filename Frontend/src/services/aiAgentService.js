import axios from "axios";

export const aiAgentService = {

  triggerJobScraper: async (role,location) => {

    await axios.post(
      "https://quantam123456789.app.n8n.cloud/webhook/job-scraping",
      { role,location }
    );

  },

  fetchScrapedJobs: async () => {

    const res = await axios.get("/api/jobscraper");

    return res.data;

  },

  triggerReferralAgent: async (companyUrl,title,location) => {

    await axios.post(
      "https://quantam123456789.app.n8n.cloud/webhook/ReferalAgent",
      {
        companyUrl,
        title,
        location
      }
    );

  },

  fetchReferrals: async () => {

    const res = await axios.get("/api/referrals");

    return res.data;

  },

  githubScore: async (repoUrl) => {

    const res = await axios.post(
      "https://quantam123456789.app.n8n.cloud/webhook/9cd921fa-58d2-4911-b907-4d430ad92878",
      { repoUrl }
    );

    return res.data;

  }

};