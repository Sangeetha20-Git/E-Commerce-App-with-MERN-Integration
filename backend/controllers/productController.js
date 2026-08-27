const Product = require("../models/Product");

// Create Product (Admin)
const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, stock } = req.body;

        const product = await Product.create({
            name,
            category,
            description,
            price,
            stock,
        });

        return res.status(201).json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;

        // Start with an empty filter
        let query = {};

        // Search
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Find products
        let products = Product.find(query);

        // Sort
        if (sort) {
            products = products.sort(sort);
        }

        const result = await products;

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};