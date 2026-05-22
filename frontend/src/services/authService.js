import api from "./api";

const authService = {
    login: async (email, password) => {
        const response = await api.post("/user/Login", { email, password });
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post("/user/Register", { name, email, password });
        return response.data;
    },
};

export default authService;
