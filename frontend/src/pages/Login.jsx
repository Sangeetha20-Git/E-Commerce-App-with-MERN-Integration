import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });

            console.log(response.data);

            const token = response.data.token;

            localStorage.setItem("token", token);

            localStorage.setItem(
                "role",
                response.data.user.role
            );

            alert("Login successful!");

            navigate("/products");

        } catch (error) {
            console.error(
                "Login failed:",
                error.response?.data?.message ||
                error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

            <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8">

                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;