import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#1e293b",
                        color: "#f1f5f9",
                        border: "1px solid rgba(148, 163, 184, 0.1)",
                        borderRadius: "0.75rem",
                        fontSize: "0.875rem",
                    },
                    success: {
                        iconTheme: {
                            primary: "#10b981",
                            secondary: "#1e293b",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#f43f5e",
                            secondary: "#1e293b",
                        },
                    },
                }}
            />
        </AuthProvider>
    </BrowserRouter>
);
