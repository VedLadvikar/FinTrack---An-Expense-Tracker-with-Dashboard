import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuTrendingUp, LuCheck, LuEye, LuEyeOff } from "react-icons/lu";

const PERKS = [
    "Free forever, no credit card needed",
    "Real-time expense tracking & analytics",
    "Secure JWT-authenticated accounts",
    "Export reports to Excel anytime",
];

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showCp, setShowCp] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
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
                        Start your financial journey today
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-8">
                        Join thousands of users who trust FinTrack to manage their money with clarity and confidence.
                    </p>
                    <div className="space-y-3">
                        {PERKS.map((perk) => (
                            <div key={perk} className="flex items-start gap-3">
                                <LuCheck size={16} className="text-[#efaa75] flex-shrink-0 mt-0.5" />
                                <span className="text-white/75 text-sm">{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative z-10 text-white/30 text-xs">
                    © 2025 FinTrack. Your data stays private.
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
                            Create your account
                        </h1>
                        <p className="text-[#7c7c7c] text-sm">
                            Start tracking your expenses today
                        </p>
                    </div>

                    <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-7 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="signup-name" className="text-sm font-medium text-[#1f1f1f] block mb-1.5">
                                    Full name
                                </label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="ft-input"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="signup-email" className="text-sm font-medium text-[#1f1f1f] block mb-1.5">
                                    Email address
                                </label>
                                <input
                                    id="signup-email"
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
                                <label htmlFor="signup-password" className="text-sm font-medium text-[#1f1f1f] block mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="signup-password"
                                        type={showPw ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Minimum 8 characters"
                                        required
                                        minLength={8}
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

                            {/* Confirm password */}
                            <div>
                                <label htmlFor="signup-confirm" className="text-sm font-medium text-[#1f1f1f] block mb-1.5">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <input
                                        id="signup-confirm"
                                        type={showCp ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter your password"
                                        required
                                        className={`ft-input pr-10 ${
                                            confirmPassword && confirmPassword !== password
                                                ? "border-red-400"
                                                : ""
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCp(!showCp)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c7c7c] hover:text-[#1f1f1f] transition-colors"
                                    >
                                        {showCp ? <LuEyeOff size={15} /> : <LuEye size={15} />}
                                    </button>
                                </div>
                                {confirmPassword && confirmPassword !== password && (
                                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                                )}
                            </div>

                            <Button type="submit" fullWidth loading={loading} className="mt-1">
                                Create Account
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-[#7c7c7c] mt-5">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#0b516a] hover:text-[#084b63] font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
