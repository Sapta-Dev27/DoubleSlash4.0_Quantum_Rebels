import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const jobMatchService = {

  analyzeMatch: async (file, description, token) => {

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("description", description);

    const response = await axios.post(
      `${BASE_URL}/jobMatch/match`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  },

  fetchAllMatches: async (token) => {

    const response = await axios.get(
      `${BASE_URL}/jobMatch/fetch`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  },

  fetchMatchById: async (id, token) => {

    const response = await axios.get(
      `${BASE_URL}/jobMatch/fetch/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  },

  deleteMatch: async (id, token) => {

    const response = await axios.delete(
      `${BASE_URL}/jobMatch/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  }

};