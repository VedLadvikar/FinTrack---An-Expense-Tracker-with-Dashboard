import { NavLink } from "react-router-dom";
import {
    LuLayoutDashboard,
    LuArrowLeftRight,
    LuFileSpreadsheet,
    LuUser,
} from "react-icons/lu";

const navItems = [
    { path: "/", label: "Dashboard", icon: LuLayoutDashboard },
    { path: "/transactions", label: "Transactions", icon: LuArrowLeftRight },
    { path: "/reports", label: "Reports", icon: LuFileSpreadsheet },
    { path: "/profile", label: "Profile", icon: LuUser },
];


export default function MobileNav() {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black-950/95 backdrop-blur-lg border-t border-jet-black-800/50">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[48px] px-2 py-1 rounded-lg transition-all duration-150 ${
                                isActive
                                    ? "text-almond-cream-400 bg-jet-black-900/50"
                                    : "text-black-600 hover:text-black-200"
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium">
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
