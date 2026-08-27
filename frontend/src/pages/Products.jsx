import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { addToCart } from "../store/cartSlice";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");

                setProducts(response.data);

            } catch (error) {
                console.error(
                    "Failed to fetch products:",
                    error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        alert(`${product.name} added to cart`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Loading products...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Page Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Our Products
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Browse our latest products
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                        >

                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {product.name}
                            </h2>

                            <p className="text-sm text-gray-500 mb-4">
                                Category: {product.category}
                            </p>

                            <p className="text-2xl font-bold text-blue-600 mb-3">
                                ₹{product.price}
                            </p>

                            <p className="text-gray-600 mb-5">
                                Stock:{" "}
                                <span className="font-semibold">
                                    {product.stock}
                                </span>
                            </p>

                            <button
                                onClick={() =>
                                    handleAddToCart(product)
                                }
                                disabled={product.stock === 0}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {product.stock === 0
                                    ? "Out of Stock"
                                    : "Add to Cart"}
                            </button>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Products;