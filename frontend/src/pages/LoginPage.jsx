import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuTrendingUp, LuShield, LuActivity, LuWallet, LuEye, LuEyeOff } from "react-icons/lu";

const FEATURES = [
    { icon: LuActivity, text: "Real-time spending analytics" },
    { icon: LuWallet,  text: "Category-wise breakdown" },
    { icon: LuShield,    text: "Bank-level data security" },
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authService.login(email, password);
            if (response.success) {
                login(response.data.user, response.data.token);
                toast.success("Welcome back!");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            <div className="hidden lg:flex flex-col justify-between w-[42%] bg-[#0b516a] p-10 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute bottom-10 -left-20 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute top-1/2 right-4 w-36 h-36 rounded-full bg-[#efaa75]/10" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <LuTrendingUp size={18} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">FinTrack</span>
                </div>

                {/* Center content */}
                <div className="relative z-10">
                    <h2 className="text-white text-3xl font-bold leading-tight mb-3">
                        Take control of your finances
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-8">
                        Track income, manage expenses, and grow your wealth — all in one beautifully designed dashboard.
                    </p>
                    <div className="space-y-4">
                        {FEATURES.map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                                    <Icon size={15} className="text-[#efaa75]" />
                                </div>
                                <span className="text-white/80 text-sm">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom tag */}
                <p className="relative z-10 text-white/30 text-xs">
                    © 2025 FinTrack. Trusted by thousands.
                </p>
            </div>


            <div className="flex-1 flex items-center justify-center bg-[#f1efec] p-6">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="flex lg:hidden items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-[#0b516a] flex items-center justify-center">
                            <LuTrendingUp size={15} className="text-white" />
                        </div>
                        <span className="text-[#1f1f1f] font-bold text-lg">FinTrack</span>
                    </div>

                    <div className="mb-7">
                        <h1 className="text-[#1f1f1f] text-2xl font-bold tracking-tight mb-1">
                            Welcome back
                        </h1>
                        <p className="text-[#7c7c7c] text-sm">
                            Sign in to manage your finances
                        </p>
                    </div>

                    <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-7 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="login-email" className="text-sm font-medium text-[#1f1f1f] block mb-1.5">
                                    Email address
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="ft-input"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="login-password" className="text-sm font-medium text-[#1f1f1f]">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs text-[#0b516a] hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPw ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="ft-input pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(!showPw)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c7c7c] hover:text-[#1f1f1f] transition-colors"
                                    >
                                        {showPw ? <LuEyeOff size={15} /> : <LuEye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-[#ece7e2] accent-[#0b516a]"
                                />
                                <span className="text-sm text-[#7c7c7c]">Remember me</span>
                            </label>

                            <Button type="submit" fullWidth loading={loading} className="mt-1">
                                Sign In
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-[#7c7c7c] mt-5">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#0b516a] hover:text-[#084b63] font-medium"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
