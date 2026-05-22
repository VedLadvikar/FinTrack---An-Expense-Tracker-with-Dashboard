import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuWallet } from "react-icons/lu";


export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authService.register(name, email, password);
            if (response.success) {
                register(response.data.user, response.data.token);
                toast.success("Account created successfully!");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black-950 p-4">
            <div className="w-full max-w-md animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-almond-cream-400 flex items-center justify-center shadow-sm">
                        <LuWallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-black-50">
                        FinTrack
                    </span>
                </div>

                <div className="glass-card p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-bold text-black-50 mb-1">
                            Create your account
                        </h1>
                        <p className="text-sm text-black-400">
                            Start tracking your expenses today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="signup-name"
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        <Input
                            id="signup-email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                        <Input
                            id="signup-password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            required
                            minLength={6}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            loading={loading}
                            className="mt-2"
                        >
                            Create Account
                        </Button>
                    </form>

                    <p className="text-center text-sm text-black-400 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-almond-cream-400 hover:text-almond-cream-500 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
