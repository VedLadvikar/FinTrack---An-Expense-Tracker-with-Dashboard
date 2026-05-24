import api from "./api";

const authService = {
    login: async (email, password) => {
        const response = await api.post("/user/login", { email, password });
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post("/user/register", { name, email, password });
        return response.data;
    },
};

export default authService;
