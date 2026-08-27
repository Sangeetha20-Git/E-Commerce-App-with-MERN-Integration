import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* App Name */}
                <h2 className="text-2xl font-bold">
                    E-Commerce App
                </h2>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-blue-200"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="hover:text-blue-200"
                    >
                        Products
                    </Link>

                    <Link
                        to="/cart"
                        className="hover:text-blue-200"
                    >
                        Cart
                    </Link>

                    <Link
                        to="/orders"
                        className="hover:text-blue-200"
                    >
                        Orders
                    </Link>

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-200"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="hover:text-blue-200"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;