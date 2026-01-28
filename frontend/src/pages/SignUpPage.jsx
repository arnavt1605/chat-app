import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim())
            return toast.error("Full name is required");

        if (!formData.email.trim())
            return toast.error("Email is required");

        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid email format");

        if (!formData.password)
            return toast.error("Password is required");

        if (formData.password.length < 6)
            return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) signup(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
            <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h1 className="text-2xl font-semibold mb-6">Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full mb-4 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                        value={formData.fullName}
                        onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-4 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-4 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
                    >
                        {isSigningUp ? "Loading..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
