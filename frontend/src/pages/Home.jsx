import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100">

            <section className="bg-blue-600 text-white py-24 px-6">

                <div className="max-w-5xl mx-auto text-center">

                    <h1 className="text-5xl font-bold mb-6">
                        Welcome to Our E-Commerce Store
                    </h1>

                    <p className="text-xl text-blue-100 mb-8">
                        Discover great products at great prices.
                    </p>

                    <Link
                        to="/products"
                        className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
                    >
                        Shop Now →
                    </Link>

                </div>

            </section>

            <section className="max-w-6xl mx-auto py-16 px-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h2 className="text-xl font-bold mb-2">
                            Quality Products
                        </h2>

                        <p className="text-gray-500">
                            Browse our collection of quality products.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h2 className="text-xl font-bold mb-2">
                            Easy Shopping
                        </h2>

                        <p className="text-gray-500">
                            Add products to your cart and order easily.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h2 className="text-xl font-bold mb-2">
                            Track Orders
                        </h2>

                        <p className="text-gray-500">
                            Track your order status from your account.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;