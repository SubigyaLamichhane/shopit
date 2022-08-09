import dotenv from 'dotenv';

import Product from '../models/product.js';
import connectDatabase from '../config/database.js';

const products = '../data/product';

//Setting dotenv file
dotenv.config({path: 'backend/config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('All products are deleted');
        await Product.insertMany(products)
        console.log('Products Added');
        process.exit();
    } catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedProducts();