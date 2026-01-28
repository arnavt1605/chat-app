import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center pt-24">
            <div className="w-full max-w-2xl px-4">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h1 className="text-2xl font-semibold mb-2">Profile</h1>
                    <p className="text-slate-400 mb-6">Your account information</p>

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-8">
                        <img src={selectedImg || authUser?.profilePic || "/avatar.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border border-slate-600" />

                        <label className="mt-4 text-sm text-indigo-400 cursor-pointer hover:underline">
                            {isUpdatingProfile ? "Uploading..." : "Change profile photo"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdatingProfile}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Full Name</p>
                            <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md">
                                {authUser?.fullName}  {/* safely access the fullName if the authUser exists*/}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400 mb-1">Email</p>
                            <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md">
                                {authUser?.email}
                            </div>
                        </div>
                    </div>

                    {/* Account meta */}
                    <div className="mt-8 border-t border-slate-700 pt-4 text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-400">Member since</span>
                            <span>{authUser?.createdAt?.split("T")[0]}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Account status</span>
                            <span className="text-green-400">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

// file → FileReader → base64 → updateProfile
