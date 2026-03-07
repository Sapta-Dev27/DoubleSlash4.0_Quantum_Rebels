import api from "./api";

export const interviewPrepService = {

  generatePrep: async (role, experience, seniority) => {

    const response = await api.post("/interviewPrep/generate", {
      role,
      experience,
      seniority
    });

    return response.data;
  },

  fetchAllPrep: async () => {

    const response = await api.get("/interviewPrep/fetch");

    return response.data;
  },

  deletePrep: async (id) => {

    const response = await api.delete(`/interviewPrep/delete/${id}`);

    return response.data;
  }

};