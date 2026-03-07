import api from "./api";

export const coverLetterService = {

  generateCoverLetter: async (role, company, description) => {

    const response = await api.post("/coverLetter/generate", {
      role,
      company,
      description
    });

    return response.data;
  },

  fetchAllLetters: async () => {

    const response = await api.get("/coverLetter/fetch");

    return response.data;
  },

  fetchLetterById: async (id) => {

    const response = await api.get(`/coverLetter/fetch/${id}`);

    return response.data;
  },

  deleteLetter: async (id) => {

    const response = await api.delete(`/coverLetter/delete/${id}`);

    return response.data;
  }

};