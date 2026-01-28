import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="w-full border-b border-slate-700 bg-slate-900 text-slate-100">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Left */}
                <Link to="/" className="text-lg font-semibold">
                    Chat Application
                </Link>

                {/* Right */}
                <div className="flex items-center gap-4 text-sm">
                    <Link to="/settings" className="text-slate-300 hover:text-white">
                        Settings
                    </Link>

                    {authUser && (  // show Profile and Logout function iff user is authenticated
                        <>
                            <Link to="/profile" className="text-slate-300 hover:text-white">
                                Profile
                            </Link>

                            <button onClick={logout} className="text-red-400 hover:text-red-300">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
