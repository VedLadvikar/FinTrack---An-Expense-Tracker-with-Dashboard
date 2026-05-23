import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
    LuLayoutDashboard,
    LuArrowLeftRight,
    LuFileSpreadsheet,
    LuUser,
    LuLogOut,
    LuTrendingUp,
} from "react-icons/lu";

const navItems = [
    { path: "/",             label: "Dashboard",    icon: LuLayoutDashboard },
    { path: "/transactions", label: "Transactions", icon: LuArrowLeftRight  },
    { path: "/reports",      label: "Reports",      icon: LuFileSpreadsheet },
    { path: "/profile",      label: "Profile",      icon: LuUser            },
];

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out");
        navigate("/login");
    };

    return (
        <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-[#0b516a] fixed left-0 top-0 bottom-0 z-30">
            <div className="flex flex-col h-full py-6 px-4">

                {/* Logo */}
                <div className="flex items-center gap-2.5 px-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <LuTrendingUp size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-white font-semibold text-[15px] tracking-tight">
                        FinTrack
                    </span>
                </div>

                {/* Nav label */}
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">
                    Menu
                </p>

                {/* Nav items */}
                <nav className="flex flex-col gap-0.5 flex-1">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === "/"}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full ${
                                    isActive
                                        ? "bg-white/15 text-white"
                                        : "text-white/55 hover:text-white/80 hover:bg-white/8"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#efaa75] rounded-r-full" />
                                    )}
                                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-4" />

                {/* User profile */}
                <div className="flex items-center gap-2.5 px-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[#efaa75] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                        <p className="text-white text-xs font-medium truncate">
                            {user?.name || "User"}
                        </p>
                        <p className="text-white/40 text-[10px] truncate">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/8 transition-all duration-150 cursor-pointer w-full text-left"
                >
                    <LuLogOut size={16} strokeWidth={2} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
