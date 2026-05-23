import { NavLink } from "react-router-dom";
import {
    LuLayoutDashboard,
    LuArrowLeftRight,
    LuFileSpreadsheet,
    LuUser,
} from "react-icons/lu";

const navItems = [
    { path: "/",             label: "Dashboard",    icon: LuLayoutDashboard },
    { path: "/transactions", label: "Transactions", icon: LuArrowLeftRight  },
    { path: "/reports",      label: "Reports",      icon: LuFileSpreadsheet },
    { path: "/profile",      label: "Profile",      icon: LuUser            },
];

export default function MobileNav() {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b516a] border-t border-white/10 flex">
            {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                        `flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors duration-150 ${
                            isActive ? "text-white" : "text-white/45"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                            <span>{label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
