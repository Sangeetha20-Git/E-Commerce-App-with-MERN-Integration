import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const [editingId, setEditingId] = useState(null);

    // GET ALL PRODUCTS
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await api.get("/products");

                console.log("Products:", response.data);

                setProducts(response.data);

            } catch (error) {
                console.error(
                    "Failed to fetch products:",
                    error.response?.data?.message ||
                    error.message
                );
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    // CREATE / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                name,
                category,
                description,
                price: Number(price),
                stock: Number(stock),
            };

            if (editingId) {

                const response = await api.put(
                    `/products/${editingId}`,
                    productData
                );

                console.log(
                    "Updated product:",
                    response.data
                );

                alert("Product updated successfully!");

                setProducts(
                    products.map((product) =>
                        product._id === editingId
                            ? response.data.product
                            : product
                    )
                );

            } else {

                const response = await api.post(
                    "/products",
                    productData
                );

                console.log(
                    "Created product:",
                    response.data
                );

                alert("Product created successfully!");

                setProducts([
                    ...products,
                    response.data.product,
                ]);
            }

            // Clear form
            setName("");
            setCategory("");
            setDescription("");
            setPrice("");
            setStock("");
            setEditingId(null);

        } catch (error) {
            console.error(
                "Product operation failed:",
                error.response?.data?.message ||
                error.message
            );
        }
    };

    // EDIT
    const handleEdit = (product) => {
        setEditingId(product._id);

        setName(product.name);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
    };

    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/products/${id}`
            );

            alert("Product deleted successfully!");

            setProducts(
                products.filter(
                    (product) =>
                        product._id !== id
                )
            );

            if (editingId === id) {
                handleCancelEdit();
            }

        } catch (error) {
            console.error(
                "Failed to delete product:",
                error.response?.data?.message ||
                error.message
            );
        }
    };

    // CANCEL EDIT
    const handleCancelEdit = () => {
        setEditingId(null);

        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setStock("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Loading products...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Admin - Products
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your products
                    </p>
                </div>

                {/* Product Form */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-10">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {editingId
                            ? "Edit Product"
                            : "Add Product"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        {/* Name */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Product Name
                            </label>

                            <input
                                type="text"
                                placeholder="Product name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                placeholder="Category"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block font-semibold text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Stock
                            </label>

                            <input
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) =>
                                    setStock(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                {editingId
                                    ? "Update Product"
                                    : "Create Product"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>

                {/* Product List */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Products
                </h2>

                {products.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-500">
                            No products found.
                        </p>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="bg-white rounded-xl shadow-md p-6"
                            >

                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    {product.name}
                                </h3>

                                <p className="text-sm text-gray-500 mb-2">
                                    Category:{" "}
                                    <span className="font-semibold">
                                        {product.category}
                                    </span>
                                </p>

                                <p className="text-gray-600 mb-4">
                                    {product.description}
                                </p>

                                <p className="text-2xl font-bold text-blue-600 mb-2">
                                    ₹{product.price}
                                </p>

                                <p className="text-gray-600 mb-5">
                                    Stock:{" "}
                                    <span className="font-semibold">
                                        {product.stock}
                                    </span>
                                </p>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product._id
                                            )
                                        }
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminProducts;