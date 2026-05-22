import api from "./api";

const reportService = {
    exportReport: async (params = {}) => {
        const response = await api.get("/reports/export", {
            params,
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "expense-report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },
};

export default reportService;
