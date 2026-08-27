import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get(
                    "/orders/my-orders"
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

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Loading orders...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center">
                        <p className="text-gray-500 text-lg">
                            You have no orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-md p-6"
                            >

                                <div className="flex justify-between items-center mb-6">

                                    <div>
                                        <h2 className="font-bold text-gray-800">
                                            Order #{order._id}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Order placed successfully
                                        </p>
                                    </div>

                                    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold capitalize">
                                        {order.status}
                                    </span>

                                </div>

                                <div className="space-y-3">

                                    {order.products.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex justify-between border-b pb-3"
                                        >
                                            <span className="text-gray-700">
                                                {item.product?.name}
                                                {" × "}
                                                {item.quantity}
                                            </span>

                                            <span className="font-semibold">
                                                ₹
                                                {(item.product?.price || 0) *
                                                    item.quantity}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                                <div className="flex justify-between mt-6 pt-4 border-t">

                                    <span className="text-lg font-semibold">
                                        Total
                                    </span>

                                    <span className="text-xl font-bold text-blue-600">
                                        ₹{order.totalAmount}
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Orders;