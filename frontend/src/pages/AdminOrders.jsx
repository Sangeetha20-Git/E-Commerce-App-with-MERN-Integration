import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get("/orders");

                console.log("FULL RESPONSE:", response);
                console.log("RESPONSE DATA:", response.data);
                console.log(
                    "IS ARRAY:",
                    Array.isArray(response.data)
                );

                setOrders(response.data);

            } catch (error) {
                console.error(
                    "Failed to fetch orders:",
                    error.response?.data?.message ||
                    error.message
                );
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const response = await api.put(
                `/orders/${orderId}/status`,
                {
                    status,
                }
            );

            console.log(response.data);

            alert("Order status updated");

            const responseAfterUpdate = await api.get(
                "/orders"
            );

            setOrders(responseAfterUpdate.data);

        } catch (error) {
            console.error(
                "Failed to update status:",
                error.response?.data?.message ||
                error.message
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Loading orders...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Admin - All Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center">
                        <p className="text-gray-500 text-lg">
                            No orders found.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-md p-6"
                            >

                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Order #{order._id}
                                        </h2>

                                        <p className="text-gray-600 mt-2">
                                            Customer:{" "}
                                            <span className="font-semibold">
                                                {order.user?.name}
                                            </span>
                                        </p>

                                        <p className="text-gray-500">
                                            {order.user?.email}
                                        </p>
                                    </div>

                                    <div className="text-left md:text-right">

                                        <p className="text-2xl font-bold text-blue-600">
                                            ₹{order.totalAmount}
                                        </p>

                                        <p className="text-gray-500 capitalize">
                                            Current status:{" "}
                                            <span className="font-semibold">
                                                {order.status}
                                            </span>
                                        </p>

                                    </div>

                                </div>

                                {/* Products */}
                                <div className="border-t border-gray-200 pt-5">

                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Products
                                    </h3>

                                    <div className="space-y-3">

                                        {order.products.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3"
                                            >
                                                <span className="text-gray-700">
                                                    {item.product?.name}
                                                </span>

                                                <span className="font-semibold text-gray-800">
                                                    × {item.quantity}
                                                </span>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                                {/* Status */}
                                <div className="border-t border-gray-200 mt-6 pt-5">

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Update Order Status
                                    </label>

                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="pending">
                                            Pending
                                        </option>

                                        <option value="processing">
                                            Processing
                                        </option>

                                        <option value="shipped">
                                            Shipped
                                        </option>

                                        <option value="delivered">
                                            Delivered
                                        </option>

                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminOrders;