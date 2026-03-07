import api from "./api";

export const dashboardService = {

  fetchStats: async () => {

    const response = await api.get("/dashboard/stats");

    return response.data;

  }

};