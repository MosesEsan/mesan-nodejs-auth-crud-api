const Product = require('../models/product');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route GET
// @desc Returns all products
// @access Public
exports.index = async function (req, res) {
    const products = await Product.find({});
    res.status(200).json({products});
};

// @route POST
// @desc Add a new product - C
// @access Public
exports.store = async (req, res) => {
    try {
        const newProduct = new Product({...req.body});

        await newProduct.save();

        res.status(200).json({message: 'Product added successfully.'});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route GET api/product/{id}
// @desc Returns a specific product - R
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) return res.status(401).json({message: 'Product does not exist'});

        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/product/
// @desc Update product details - U
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;

        const product = await Product.findByIdAndUpdate(id, {$set: update}, {new: true});

        res.status(200).json({product, message: 'Product has been updated'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route DESTROY api/product/{id}
// @desc Delete Product - D
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;

        await Product.findByIdAndDelete(id);

        res.status(200).json({message: 'Product has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};