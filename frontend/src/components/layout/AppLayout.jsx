import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";


export default function AppLayout() {
    return (
        <div className="flex min-h-screen bg-black-950">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
            <MobileNav />
        </div>
    );
}
