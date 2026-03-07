import api from "./api";

export const authService = {

  login: async (email, password) => {
    const response = await api.post("/auth/login", {
      useremail: email,
      userpassword: password
    });

    return response.data;
  },

  register: async (name, email, password, role) => {
    const response = await api.post("/auth/register", {
      username: name,
      useremail: email,
      userpassword: password,
      userrole: role
    });

    return response.data;
  }

};