import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page reload on form submission

        login(formData); // trigger login with current form state
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
            <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h1 className="text-2xl font-semibold mb-6">Welcome Back</h1>

                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"
                        className="w-full mb-4 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                        value={formData.email} // whatever is in the state formData, that is what the user should see, or whithout this React would read from the DOM but never write back.
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value }) // ... => spread operator 
                        }
                    />

                    <input type="password" placeholder="Password"
                        className="w-full mb-4 px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-indigo-500"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <button type="submit" disabled={isLoggingIn} className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60">
                        {isLoggingIn ? "Loading..." : "Sign in"}
                    </button>
                </form>

                <p className="mt-4 text-sm">Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-indigo-400 hover:underline">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;



// Keyboard
//   ↓
// Browser updates input DOM value
//   ↓
// onChange event fires
//   ↓
// Value appears in e.target.value
//   ↓
// You copy it into React state
//   ↓
// React re-renders
//   ↓
// State value is written back to input
