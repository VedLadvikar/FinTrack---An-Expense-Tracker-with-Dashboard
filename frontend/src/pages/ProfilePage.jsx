import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuUser, LuLock, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileLoading, setProfileLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
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
            const response = await userService.updatePassword({
                currentPassword,
                newPassword,
            });
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

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-black-50 mb-1">Profile</h1>
                <p className="text-sm text-black-400">
                    Manage your account settings
                </p>
            </div>

            <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-almond-cream-400 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-black-50">
                        {user?.name}
                    </h2>
                    <p className="text-sm text-black-400">{user?.email}</p>
                </div>
            </div>

            {/* Edit Profile */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                    <LuUser className="w-5 h-5 text-almond-cream-400" />
                    <h2 className="text-base font-semibold text-black-200">
                        Edit Profile
                    </h2>
                </div>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <Input
                        id="profile-name"
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={3}
                    />
                    <Input
                        id="profile-email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" loading={profileLoading}>
                        Save Changes
                    </Button>
                </form>
            </div>

            {/* Change Password */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                    <LuLock className="w-5 h-5 text-warning" />
                    <h2 className="text-base font-semibold text-black-200">
                        Change Password
                    </h2>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <Input
                        id="current-password"
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <Input
                        id="new-password"
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        required
                        minLength={6}
                    />
                    <Button type="submit" loading={passwordLoading}>
                        Update Password
                    </Button>
                </form>
            </div>

            {/* Logout */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-black-200 mb-1">
                            Logout
                        </h2>
                        <p className="text-sm text-black-400">
                            Sign out of your account
                        </p>
                    </div>
                    <Button variant="danger" onClick={handleLogout}>
                        <LuLogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
