export const storage = {
  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setUser: (user) => {
    localStorage.setItem("user", user);
  },

  getUser: () => {
    return localStorage.getItem("user");
  },

  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};