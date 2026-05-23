import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-[#f1efec]">
            <Sidebar />
            {/* Main content — offset for sidebar on lg+ */}
            <main className="lg:ml-56 pb-20 lg:pb-0">
                <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-7">
                    <Outlet />
                </div>
            </main>
            <MobileNav />
        </div>
    );
}
