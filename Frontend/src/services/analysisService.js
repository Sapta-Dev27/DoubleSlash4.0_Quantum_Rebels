import api from "./api";

export const analysisService = {

  analyzeResume: async (file) => {

    const formData = new FormData();

    // MUST match upload.single("resume")
    formData.append("resume", file);

    const response = await api.post(
      "/resumeAnalyzer/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  },

  fetchAllAnalysis: async () => {

    const response = await api.get("/resumeAnalyzer/fetch");

    return response.data;
  },
   fetchAnalysisById: async (id) => {

    const response = await api.get(`/resumeAnalyzer/fetch/${id}`);

    return response.data;
  },

  deleteAnalysis: async (id) => {

    const response = await api.delete(`/resumeAnalyzer/delete/${id}`);

    return response.data;
  }

};