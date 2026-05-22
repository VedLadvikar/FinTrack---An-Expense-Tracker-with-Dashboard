import api from "./api";

const userService = {
    getCurrentUser: async () => {
        const response = await api.get("/user/me");
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put("/user/Profile", data);
        return response.data;
    },

    updatePassword: async (data) => {
        const response = await api.put("/user/Password", data);
        return response.data;
    },
};

export default userService;
