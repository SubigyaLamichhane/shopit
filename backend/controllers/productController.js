import product from '../models/product.js';
import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/APIFeatures.js';

export const newProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

export const getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
});

export const getSingleProduct = catchAsyncErrors(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    } 
    res.status(200).json({
        success: true,
        product
    })
});

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    } 

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    });
});

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product deleted successuflly'
    })
});