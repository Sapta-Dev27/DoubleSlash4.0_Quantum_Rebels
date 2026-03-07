import api from "./api";

export const jobService = {

  fetchJobs: async () => {
    const res = await api.get("/job/fetch");
    return res.data;
  },

  fetchJobsofRecruiter: async () => {
    const res = await api.get("/job/fetch/recruiter");
    return res.data;
  },

  fetchJobById: async (id) => {
    const res = await api.get(`/job/fetch/${id}`);
    return res.data;
  }

};