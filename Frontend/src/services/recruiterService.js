import api from "./api";

export const recruiterService = {

  createJob: async (jobData) => {
    const res = await api.post("/job/create", jobData);
    return res.data;
  },

  fetchJobs: async () => {
    const res = await api.get("/job/fetch/recruiter");
    return res.data;
  },

  fetchJobById: async (id) => {
    const res = await api.get(`/job/fetch/${id}`);
    return res.data;
  },

  updateJob: async (id, jobData) => {
    const res = await api.put(`/job/update/${id}`, jobData);
    return res.data;
  },

  deleteJob: async (id) => {
    const res = await api.delete(`/job/delete/${id}`);
    return res.data;
  },

  getApplicants: async (jobId) => {
    const res = await api.get(`/application/applicants/${jobId}`);
    return res.data;
  },

  updateApplicationStatus: async (appId, status) => {
    const res = await api.put(`/application/updateStatus/${appId}`, { status });
    return res.data;
  }

};