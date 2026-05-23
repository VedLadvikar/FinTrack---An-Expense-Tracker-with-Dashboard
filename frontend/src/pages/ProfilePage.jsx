import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuUser, LuLock, LuLogOut, LuMail, LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileLoading, setProfileLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCp, setShowCp] = useState(false);
    const [showNp, setShowNp] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        try {
            const response = await userService.updateProfile({ name, email });
            if (response.success) {
                updateUser(response.data.user);
                toast.success("Profile updated");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        try {
            const response = await userService.updatePassword({ currentPassword, newPassword });
            if (response.success) {
                toast.success("Password changed successfully");
                setCurrentPassword("");
                setNewPassword("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password");
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        toast.success("Logged out");
        navigate("/login");
    };

    const INPUT_CLS = "w-full px-3 py-2.5 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] placeholder-[#adadad] outline-none focus:border-[#0b516a] focus:shadow-[0_0_0_3px_rgba(11,81,106,0.1)] transition-all";
    const LABEL_CLS = "block text-sm font-medium text-[#1f1f1f] mb-1.5";

    return (
        <div className="space-y-5 max-w-2xl" style={{ animation: "fade-in 0.35s ease-out" }}>
            {/* Page header */}
            <div>
                <h1 className="text-[#1f1f1f] text-2xl font-bold tracking-tight mb-0.5">Profile</h1>
                <p className="text-[#7c7c7c] text-sm">Manage your account settings</p>
            </div>

            {/* Avatar + info */}
            <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#efaa75] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                    <h2 className="text-[#1f1f1f] text-base font-semibold">{user?.name}</h2>
                    <p className="text-[#7c7c7c] text-sm flex items-center gap-1.5 mt-0.5">
                        <LuMail size={13} />
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Edit Profile */}
            <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-6 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-[#0b516a]/10 flex items-center justify-center">
                        <LuUser size={14} className="text-[#0b516a]" />
                    </div>
                    <h2 className="text-[#1f1f1f] text-sm font-semibold">Edit Profile</h2>
                </div>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="profile-name" className={LABEL_CLS}>Full Name</label>
                        <input
                            id="profile-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            minLength={3}
                            className={INPUT_CLS}
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-email" className={LABEL_CLS}>Email Address</label>
                        <input
                            id="profile-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={INPUT_CLS}
                            placeholder="your@email.com"
                        />
                    </div>
                    <Button type="submit" loading={profileLoading}>
                        Save Changes
                    </Button>
                </form>
            </div>

            {/* Change Password */}
            <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-6 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-[#efaa75]/15 flex items-center justify-center">
                        <LuLock size={14} className="text-[#c97a45]" />
                    </div>
                    <h2 className="text-[#1f1f1f] text-sm font-semibold">Change Password</h2>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label htmlFor="current-password" className={LABEL_CLS}>Current Password</label>
                        <div className="relative">
                            <input
                                id="current-password"
                                type={showCp ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className={`${INPUT_CLS} pr-10`}
                                placeholder="Enter current password"
                            />
                            <button type="button" onClick={() => setShowCp(!showCp)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c7c7c] hover:text-[#1f1f1f] transition-colors">
                                {showCp ? <LuEyeOff size={15} /> : <LuEye size={15} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="new-password" className={LABEL_CLS}>New Password</label>
                        <div className="relative">
                            <input
                                id="new-password"
                                type={showNp ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={8}
                                className={`${INPUT_CLS} pr-10`}
                                placeholder="Minimum 8 characters"
                            />
                            <button type="button" onClick={() => setShowNp(!showNp)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c7c7c] hover:text-[#1f1f1f] transition-colors">
                                {showNp ? <LuEyeOff size={15} /> : <LuEye size={15} />}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" loading={passwordLoading}>
                        Update Password
                    </Button>
                </form>
            </div>

            {/* Logout */}
            <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-[#1f1f1f] text-sm font-semibold mb-0.5">Sign Out</h2>
                        <p className="text-[#7c7c7c] text-xs">Sign out from this device</p>
                    </div>
                    <Button variant="danger" onClick={handleLogout}>
                        <LuLogOut size={14} />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
