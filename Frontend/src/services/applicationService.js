import api from "./api";

export const applicationService = {

  applyJob: async (jobId, file) => {

    const formData = new FormData();
    formData.append("resume", file);

    const res = await api.post(
      `/application/apply/${jobId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res.data;

  },
  fetchApplications: async () => {

    const response = await api.get("/application/fetch");

    return response.data;

  }

};