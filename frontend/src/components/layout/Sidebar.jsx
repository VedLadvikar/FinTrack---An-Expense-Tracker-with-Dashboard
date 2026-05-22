import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
    LuLayoutDashboard,
    LuArrowLeftRight,
    LuFileSpreadsheet,
    LuUser,
    LuLogOut,
    LuWallet,
} from "react-icons/lu";

const navItems = [
    { path: "/", label: "Dashboard", icon: LuLayoutDashboard },
    { path: "/transactions", label: "Transactions", icon: LuArrowLeftRight },
    { path: "/reports", label: "Reports", icon: LuFileSpreadsheet },
    { path: "/profile", label: "Profile", icon: LuUser },
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
        <aside className="hidden md:flex flex-col w-64 h-screen bg-black-950/80 border-r border-jet-black-800/50 p-5 sticky top-0">
            <div className="flex items-center gap-3 mb-10 px-4">
                <div className="w-8 h-8 rounded-lg bg-almond-cream-400 flex items-center justify-center shadow-sm">
                    <LuWallet className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-black-50">
                    FinTrack
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 border-l-[3px] ${
                                isActive
                                    ? "border-almond-cream-400 bg-jet-black-900 text-black-50"
                                    : "border-transparent text-black-400 hover:text-black-50 hover:bg-jet-black-900/50"
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-jet-black-800/50 pt-4 mt-4">
                <div className="flex items-center gap-3 px-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-jet-black-900 border border-jet-black-800 flex items-center justify-center text-black-200 font-semibold text-xs shadow-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black-200 truncate">
                            {user?.name}
                        </p>
                        <p className="text-xs text-black-600 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-black-400 hover:text-red-400 hover:bg-stone-brown-500/10 transition-all duration-200 cursor-pointer"
                >
                    <LuLogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
