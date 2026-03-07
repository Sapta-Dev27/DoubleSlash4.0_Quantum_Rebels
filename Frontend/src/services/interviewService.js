import api from "./api";

export const interviewService = {

  generateInterview: async (file) => {

    const formData = new FormData();

    formData.append("resume", file);   // must match multer field name

    const response = await api.post(
      "/interview/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  fetchInterviews: async () => {
    const response = await api.get("/interview/fetch");
    return response.data;
  },

  fetchInterviewById: async (id) => {
    const response = await api.get(`/interview/fetch/${id}`);
    return response.data;
  },

  deleteInterview: async (id) => {
    const response = await api.delete(`/interview/delete/${id}`);
    return response.data;
  }

};