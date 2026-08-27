import { useSelector, useDispatch } from "react-redux";

import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "../store/cartSlice";

import api from "../services/api";

function Cart() {
    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                products: cartItems.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                totalAmount: totalPrice,
            };

            const response = await api.post(
                "/orders",
                orderData
            );

            console.log(response.data);

            alert("Order placed successfully!");

            dispatch(clearCart());

        } catch (error) {
            console.error(
                "Order failed:",
                error.response?.data?.message ||
                error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center">

                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500">
                            Add some products to your cart.
                        </p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">

                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >

                                    <div className="flex justify-between items-start">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                ₹{item.price} each
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleRemove(item._id)
                                            }
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                    <div className="flex items-center justify-between mt-6">

                                        {/* Quantity */}
                                        <div className="flex items-center gap-3">

                                            <button
                                                onClick={() =>
                                                    handleDecrease(item._id)
                                                }
                                                className="w-9 h-9 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
                                            >
                                                -
                                            </button>

                                            <span className="text-lg font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleIncrease(item._id)
                                                }
                                                className="w-9 h-9 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* Subtotal */}
                                        <p className="text-lg font-bold text-gray-800">
                                            ₹{item.price * item.quantity}
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-xl shadow-md p-6 h-fit">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">
                                    Items
                                </span>

                                <span className="font-semibold">
                                    {cartItems.reduce(
                                        (total, item) =>
                                            total + item.quantity,
                                        0
                                    )}
                                </span>
                            </div>

                            <hr className="mb-4" />

                            <div className="flex justify-between mb-6">
                                <span className="text-lg font-semibold">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-blue-600">
                                    ₹{totalPrice}
                                </span>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Place Order
                            </button>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Cart;